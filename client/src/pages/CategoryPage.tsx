import { Link, useLocation } from "wouter";
import { articles, CATEGORIES } from "../data/articles";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronRight, Menu, X } from "lucide-react";

const CATEGORY_SEO: Record<string, { metaTitle: string; metaDescription: string; h1: string; intro: string }> = {
  "work-totes": { metaTitle: 'Work Totes | Best Leather Totes', metaDescription: 'Browse 3 articles about work totes on Best Leather Totes.', h1: 'Work Totes', intro: 'Browse 3 articles about work totes on Best Leather Totes.' },
  "travel-totes": { metaTitle: 'Travel Totes | Best Leather Totes', metaDescription: 'Browse 3 articles about travel totes on Best Leather Totes.', h1: 'Travel Totes', intro: 'Browse 3 articles about travel totes on Best Leather Totes.' },
  "everyday-carry": { metaTitle: 'Everyday Carry | Best Leather Totes', metaDescription: 'Browse 3 articles about everyday carry on Best Leather Totes.', h1: 'Everyday Carry', intro: 'Browse 3 articles about everyday carry on Best Leather Totes.' },
  "leather-care-tips": { metaTitle: 'Leather Care Tips | Best Leather Totes', metaDescription: 'Browse 3 articles about leather care tips on Best Leather Totes.', h1: 'Leather Care Tips', intro: 'Browse 3 articles about leather care tips on Best Leather Totes.' },
  "budget-friendly-picks": { metaTitle: 'Budget Friendly Picks | Best Leather Totes', metaDescription: 'Browse 3 articles about budget friendly picks on Best Leather Totes.', h1: 'Budget Friendly Picks', intro: 'Browse 3 articles about budget friendly picks on Best Leather Totes.' }
};

export default function CategoryPage() {
  const [location] = useLocation();
  const slug = location.split("/").filter(Boolean).join("/");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const catInfo = CATEGORIES.find((c) => c.slug === slug);
  const seo = CATEGORY_SEO[slug] || {};
  const categoryArticles = articles.filter((a) => a.categorySlug === slug);
  const topicSections = CATEGORIES.filter((c) => c.slug !== "all").map((cat) => ({
    ...cat,
    items: articles.filter((a) => a.categorySlug === cat.slug),
  })).filter((s) => s.items.length > 0);

  useEffect(() => {
    if (!catInfo) return;
    document.title = seo.metaTitle || catInfo.label;
    const setMeta = (selector: string, attr: string, value: string, attrName: string) => {
      let el = document.querySelector(selector) as HTMLElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attr);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };
    const desc = seo.metaDescription || '';
    const pageUrl = 'https://bestwomensleathertotes.com/' + slug;
    setMeta('meta[name="description"]', 'description', desc, 'name');
    setMeta('meta[property="og:title"]', 'og:title', seo.metaTitle || catInfo.label, 'property');
    setMeta('meta[property="og:description"]', 'og:description', desc, 'property');
    setMeta('meta[property="og:url"]', 'og:url', pageUrl, 'property');
    setMeta('meta[property="og:type"]', 'og:type', 'website', 'property');
    setMeta('meta[property="og:site_name"]', 'og:site_name', 'Best Leather Totes', 'property');
    setMeta('meta[name="twitter:card"]', 'twitter:card', 'summary_large_image', 'name');
    setMeta('meta[name="twitter:title"]', 'twitter:title', seo.metaTitle || catInfo.label, 'name');
    setMeta('meta[name="twitter:description"]', 'twitter:description', desc, 'name');
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.setAttribute('href', pageUrl);
    const existingScript = document.querySelector('script[data-schema="collection"]');
    if (existingScript) existingScript.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'collection');
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": seo.h1 || catInfo.label,
      "description": desc,
      "url": pageUrl,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": 'https://bestwomensleathertotes.com' },
          { "@type": "ListItem", "position": 2, "name": catInfo.label, "item": pageUrl },
        ]
      }
    });
    document.head.appendChild(script);
  }, [slug, catInfo]);

  const C = {
    accent: "#00cc66",
    bg: "#faf7f2",
    bgCard: "#f4f0e8",
    bgDark: "#2c2416",
    bgHover: "#f0ebe0",
    border: "#ddd5c0",
    borderLight: "#e8e2d4",
    primary: "#1c1610",
    body: "#3a2e1e",
    secondary: "#6b5a3e",
    tertiary: "#9a8870",
    faint: "#c4b89a",
  };

  if (!catInfo) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: C.tertiary, fontFamily: "'Lora', Georgia, serif", fontStyle: "italic" }}>Category not found</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.body, overflowX: "hidden", maxWidth: "100vw" }}>

      {/* Header — dark masthead matching home */}
      <header style={{ background: C.bgDark, borderBottom: `3px solid ${C.accent}`, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ padding: "14px clamp(20px, 5vw, 60px)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/">
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.2rem", color: "#faf7f2", cursor: "pointer" }}>
              Best Leather Totes
            </span>
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: "0" }} className="hidden-mobile">
            {topicSections.map((sec) => (
              <Link key={sec.slug} href={`/${sec.slug}`}>
                <span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "13px", color: sec.slug === slug ? "#faf7f2" : C.faint, padding: "8px 16px", display: "inline-block", cursor: "pointer", borderBottom: sec.slug === slug ? `2px solid ${C.accent}` : "2px solid transparent", transition: "color 0.15s, border-color 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#faf7f2"; e.currentTarget.style.borderBottomColor = C.accent; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = sec.slug === slug ? "#faf7f2" : C.faint; e.currentTarget.style.borderBottomColor = sec.slug === slug ? C.accent : "transparent"; }}
                >
                  {sec.label}
                </span>
              </Link>
            ))}
          </nav>
          <button className="mobile-only" onClick={() => setMobileNavOpen((v) => !v)} style={{ background: "none", border: `1px solid ${C.accent}55`, color: C.faint, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", padding: "6px 12px", borderRadius: "2px" }}>
            {mobileNavOpen ? <X size={14} /> : <Menu size={14} />}
            <span>{mobileNavOpen ? "Close" : "Topics"}</span>
          </button>
        </div>
        {mobileNavOpen && (
          <div className="mobile-only" style={{ borderTop: `1px solid ${C.accent}33`, background: C.bgDark, flexDirection: "column" }}>
            {topicSections.map((sec) => (
              <Link key={sec.slug} href={`/${sec.slug}`}>
                <div onClick={() => setMobileNavOpen(false)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "14px", color: C.faint, borderBottom: `1px solid ${C.accent}22`, cursor: "pointer" }}>
                  <span>{sec.label}</span>
                  <ChevronRight size={14} color={C.tertiary} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Category hero */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "48px clamp(20px, 5vw, 60px) 40px", background: C.bgCard }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.tertiary, marginBottom: "20px" }}>
            <Link href="/"><span style={{ color: C.tertiary, cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)} onMouseLeave={(e) => (e.currentTarget.style.color = C.tertiary)}>Home</span></Link>
            <ChevronRight size={12} color={C.faint} />
            <span style={{ color: C.secondary }}>{catInfo.label}</span>
          </div>
          {/* Ornamental rule + title */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
            <div style={{ width: "4px", height: "36px", background: C.accent, borderRadius: "1px", flexShrink: 0 }} />
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, color: C.primary, lineHeight: 1.2 }}>
              {seo.h1 || catInfo.label}
            </h1>
          </div>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "15px", lineHeight: 1.8, color: C.secondary, maxWidth: "600px", marginLeft: "20px" }}>
            {seo.intro}
          </p>
          <div style={{ marginTop: "14px", marginLeft: "20px", fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.faint }}>
            {categoryArticles.length} article{categoryArticles.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Articles list */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px clamp(20px, 5vw, 60px) 96px" }}>
        {categoryArticles.length === 0 ? (
          <p style={{ color: C.tertiary, fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "14px" }}>No articles in this category yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {categoryArticles.map((article, idx) => (
              <Link key={article.id} href={`/articles/${article.slug}`}>
                <div
                  style={{ borderBottom: `1px solid ${C.border}`, padding: "24px 0", cursor: "pointer", transition: "padding-left 0.15s, background 0.15s", borderRadius: "2px" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = C.bgHover; (e.currentTarget as HTMLDivElement).style.paddingLeft = "10px"; (e.currentTarget as HTMLDivElement).style.paddingRight = "10px"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; (e.currentTarget as HTMLDivElement).style.paddingLeft = "0"; (e.currentTarget as HTMLDivElement).style.paddingRight = "0"; }}
                >
                  <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                    {/* Number */}
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.2rem", fontWeight: 700, color: C.faint, minWidth: "28px", paddingTop: "2px", flexShrink: 0, fontStyle: "italic" }}>
                      {idx + 1}
                    </span>
                    {/* Thumbnail */}
                    {article.thumbnail && (
                      <div className="thumb-list" style={{ flexShrink: 0, overflow: "hidden", borderRadius: "2px", border: `1px solid ${C.border}` }}>
                        <img src={article.thumbnail} alt={article.altText || article.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                      </div>
                    )}
                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.05rem", fontWeight: 700, color: C.primary, lineHeight: 1.35, margin: 0 }}>
                          {article.title}
                        </h2>
                        {article.articleType && article.articleType !== 'blog' && (
                          <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "8px", fontWeight: 700, color: "#faf7f2", background: C.accent, letterSpacing: "0.06em", textTransform: "uppercase", padding: "2px 7px", borderRadius: "1px", flexShrink: 0 }}>
                            {article.articleType === 'listicle' ? 'LISTICLE' : 'VS'}
                          </span>
                        )}
                      </div>
                      <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "14px", color: C.secondary, lineHeight: 1.7, marginBottom: "10px" }}>
                        {article.excerpt}
                      </p>
                      <span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.accent, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        Continue reading <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ background: C.bgDark, borderTop: `3px solid ${C.accent}`, padding: "32px clamp(20px, 5vw, 60px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <Link href="/">
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1rem", fontWeight: 700, color: "#faf7f2", cursor: "pointer" }}>
              Best Leather Totes
            </span>
          </Link>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <Link href="/about"><span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.faint, cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#faf7f2")} onMouseLeave={(e) => (e.currentTarget.style.color = C.faint)}>About</span></Link>
            <Link href="/contact"><span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.faint, cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#faf7f2")} onMouseLeave={(e) => (e.currentTarget.style.color = C.faint)}>Contact</span></Link>
            <Link href="/privacy"><span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.faint, cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#faf7f2")} onMouseLeave={(e) => (e.currentTarget.style.color = C.faint)}>Privacy</span></Link>
            <Link href="/disclaimer"><span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.faint, cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#faf7f2")} onMouseLeave={(e) => (e.currentTarget.style.color = C.faint)}>Disclaimer</span></Link>
          </div>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.tertiary }}>
            © {new Date().getFullYear()} bestwomensleathertotes.com
          </p>
        </div>
      </footer>
    </div>
  );
}
