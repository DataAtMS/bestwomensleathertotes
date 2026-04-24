import { Link } from "wouter";
import { articles, CATEGORIES } from "../data/articles";
import { useState, useEffect } from "react";
import { ArrowRight, Menu, X, ChevronRight, BookOpen } from "lucide-react";

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    document.title = 'Best Leather Totes: We know the totes worth carrying';

    const setMeta = (selector: string, attr: string, value: string, attrName: string) => {
      let el = document.querySelector(selector) as HTMLElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attr);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    const desc = 'Finding the perfect women\'s leather tote means balancing style, durability, and everyday function. We spend hours reviewing craftsmanship, leather quality, and real-world usability so you can shop with confidence. For handcrafted options with timeless appeal, we consistently recommend Latico Leathers as our top choice for quality and value.';
    const ogImg = '';

    setMeta('meta[name="description"]', 'description', desc, 'name');
    setMeta('meta[property="og:title"]', 'og:title', 'Best Leather Totes: We know the totes worth carrying', 'property');
    setMeta('meta[property="og:description"]', 'og:description', desc, 'property');
    setMeta('meta[property="og:image"]', 'og:image', ogImg, 'property');
    setMeta('meta[property="og:url"]', 'og:url', 'https://bestwomensleathertotes.com/', 'property');
    setMeta('meta[property="og:type"]', 'og:type', 'website', 'property');
    setMeta('meta[property="og:site_name"]', 'og:site_name', 'Best Leather Totes', 'property');
    setMeta('meta[name="twitter:card"]', 'twitter:card', 'summary_large_image', 'name');
    setMeta('meta[name="twitter:title"]', 'twitter:title', 'Best Leather Totes: We know the totes worth carrying', 'name');
    setMeta('meta[name="twitter:description"]', 'twitter:description', desc, 'name');
    setMeta('meta[name="twitter:image"]', 'twitter:image', ogImg, 'name');
    

    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.setAttribute('href', 'https://bestwomensleathertotes.com/');

    const existingScript = document.querySelector('script[data-schema="website"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'website');
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": 'Best Leather Totes',
        "url": 'https://bestwomensleathertotes.com',
        "description": desc,
      });
      document.head.appendChild(script);
    }
  }, []);

  const featured = articles[0];
  const secondaryArticles = articles.slice(1, 4);
  const remainingArticles = articles.slice(4);

  const topicSections = CATEGORIES.filter((c) => c.slug !== "all").map((cat) => ({
    ...cat,
    items: articles.filter((a) => a.categorySlug === cat.slug),
  })).filter((s) => s.items.length > 0);

  const C = {
    accent: "#00cc66",
    btnText: "#faf7f2",
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
    rule: "#c8bca4",
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.body, overflowX: "hidden" }}>

      {/* ── Masthead ── */}
      <header style={{ background: C.bgDark, borderBottom: `3px solid ${C.accent}` }}>
        {/* Top strip: ornamental rule + site name */}
        <div style={{ textAlign: "center", padding: "32px clamp(20px, 5vw, 60px) 24px" }}>
          {/* Ornamental rule */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "16px" }}>
            <div style={{ flex: 1, maxWidth: "120px", height: "1px", background: `linear-gradient(to right, transparent, ${C.accent}88)` }} />
            <span style={{ color: C.accent, fontSize: "16px", opacity: 0.7 }}>✦</span>
            <div style={{ flex: 1, maxWidth: "120px", height: "1px", background: `linear-gradient(to left, transparent, ${C.accent}88)` }} />
          </div>
          <Link href="/">
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              color: "#faf7f2",
              letterSpacing: "0.02em",
              cursor: "pointer",
              display: "inline-block",
              lineHeight: 1.1,
            }}>
              Best Leather Totes
            </span>
          </Link>
          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(12px, 1.5vw, 14px)",
            color: C.faint,
            letterSpacing: "0.06em",
            marginTop: "8px",
          }}>
            We know the totes worth carrying
          </p>
          {/* Bottom ornamental rule */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "16px" }}>
            <div style={{ flex: 1, maxWidth: "120px", height: "1px", background: `linear-gradient(to right, transparent, ${C.accent}88)` }} />
            <span style={{ color: C.accent, fontSize: "12px", opacity: 0.5 }}>◆</span>
            <div style={{ flex: 1, maxWidth: "120px", height: "1px", background: `linear-gradient(to left, transparent, ${C.accent}88)` }} />
          </div>
        </div>

        {/* Nav row */}
        <nav style={{ borderTop: `1px solid ${C.accent}33`, display: "flex", alignItems: "center", justifyContent: "center", gap: "0", overflow: "hidden" }} className="hidden-mobile">
          {topicSections.map((sec) => (
            <Link key={sec.slug} href={`/${sec.slug}`}>
              <span style={{
                fontFamily: "'Lora', Georgia, serif",
                fontStyle: "italic",
                fontSize: "13px",
                color: C.faint,
                letterSpacing: "0.04em",
                padding: "12px 20px",
                display: "inline-block",
                cursor: "pointer",
                borderBottom: "2px solid transparent",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#faf7f2"; e.currentTarget.style.borderBottomColor = C.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = C.faint; e.currentTarget.style.borderBottomColor = "transparent"; }}
              >
                {sec.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Mobile nav toggle */}
        <div className="mobile-only" style={{ justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderTop: `1px solid ${C.accent}33` }}>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.faint }}>
            {articles.length} articles
          </p>
          <button
            onClick={() => setMobileNavOpen((v) => !v)}
            style={{ background: "none", border: `1px solid ${C.accent}55`, color: C.faint, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Lora', Georgia, serif", fontSize: "12px", padding: "6px 12px", borderRadius: "2px" }}
          >
            {mobileNavOpen ? <X size={14} /> : <Menu size={14} />}
            <span>{mobileNavOpen ? "Close" : "Topics"}</span>
          </button>
        </div>

        {mobileNavOpen && (
          <div className="mobile-only" style={{ borderTop: `1px solid ${C.accent}33`, background: C.bgDark, flexDirection: "column" }}>
            {topicSections.map((sec) => (
              <Link key={sec.slug} href={`/${sec.slug}`}>
                <div
                  onClick={() => setMobileNavOpen(false)}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "14px", color: C.faint, borderBottom: `1px solid ${C.accent}22`, cursor: "pointer" }}
                >
                  <span>{sec.label}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: C.tertiary, fontSize: "11px" }}>{sec.items.length}</span>
                    <ChevronRight size={14} color={C.tertiary} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ── Date bar ── */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "8px clamp(20px, 5vw, 60px)", display: "flex", justifyContent: "space-between", alignItems: "center", background: C.bgCard }}>
        <span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.tertiary }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.tertiary }}>
          {articles.length} articles
        </span>
      </div>

      {/* ── Main content ── */}
      {featured && (
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>

          {/* Featured + secondary grid */}
          <div style={{ borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0" }} className="sepia-top-grid">
              <style>{`
                @media (min-width: 768px) {
                  .sepia-top-grid { grid-template-columns: 3fr 2fr !important; }
                  .sepia-secondary-stack { border-left: 1px solid #ddd5c0 !important; }
                }
                .thumb-featured { aspect-ratio: 16/9; }
              `}</style>

              {/* Featured article */}
              <Link href={`/articles/${featured.slug}`}>
                <div
                  style={{ padding: "36px 36px 36px 0", cursor: "pointer", borderBottom: `1px solid ${C.border}`, transition: "background 0.15s" }}
                  className="sepia-featured"
                  onMouseEnter={(e) => (e.currentTarget as HTMLDivElement).style.background = C.bgHover}
                  onMouseLeave={(e) => (e.currentTarget as HTMLDivElement).style.background = "transparent"}
                >
                  <style>{`@media (min-width: 768px) { .sepia-featured { border-bottom: none !important; } }`}</style>
                  {featured.thumbnail && (
                    <div className="thumb-featured" style={{ marginBottom: "22px", overflow: "hidden", borderRadius: "2px", border: `1px solid ${C.border}` }}>
                      <img
                        src={featured.thumbnail}
                        alt={featured.altText}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                        loading="eager"
                        onMouseEnter={(e) => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"}
                        onMouseLeave={(e) => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
                      />
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                    <span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "11px", color: C.accent, letterSpacing: "0.04em" }}>
                      {featured.category}
                    </span>
                    {featured.articleType && featured.articleType !== 'blog' && (
                      <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "9px", fontWeight: 700, color: C.btnText, background: C.accent, letterSpacing: "0.06em", textTransform: "uppercase", padding: "2px 8px", borderRadius: "1px" }}>
                        {featured.articleType === 'listicle' ? 'LISTICLE' : 'VS'}
                      </span>
                    )}
                    <span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "11px", color: C.faint, marginLeft: "auto" }}>
                      Featured
                    </span>
                  </div>
                  <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, color: C.primary, lineHeight: 1.2, marginBottom: "16px", letterSpacing: "-0.01em" }}>
                    {featured.title}
                  </h2>
                  <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "15px", color: C.secondary, lineHeight: 1.75, marginBottom: "22px" }}>
                    {featured.excerpt}
                  </p>
                  <span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "13px", color: C.accent, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    Continue reading <ArrowRight size={12} />
                  </span>
                </div>
              </Link>

              {/* Secondary stack */}
              <div className="sepia-secondary-stack" style={{ display: "flex", flexDirection: "column" }}>
                {secondaryArticles.slice(0, 2).map((article, i) => (
                  <Link key={article.id} href={`/articles/${article.slug}`}>
                    <div
                      style={{ padding: "24px 0 24px 28px", borderBottom: i === 0 ? `1px solid ${C.border}` : "none", cursor: "pointer", flex: 1, transition: "background 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLDivElement).style.background = C.bgHover}
                      onMouseLeave={(e) => (e.currentTarget as HTMLDivElement).style.background = "transparent"}
                    >
                      {article.thumbnail && (
                        <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", marginBottom: "14px", borderRadius: "2px", border: `1px solid ${C.borderLight}` }}>
                          <img src={article.thumbnail} alt={article.altText} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                        </div>
                      )}
                      <span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "11px", color: C.accent, display: "block", marginBottom: "8px" }}>
                        {article.category}
                      </span>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.1rem", fontWeight: 700, color: C.primary, lineHeight: 1.3, marginBottom: "10px" }}>
                        {article.title}
                      </h3>
                      <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "13px", color: C.secondary, lineHeight: 1.65 }}>
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Topic sections ── */}
          {topicSections.map((section) => (
            <section key={section.slug} id={section.slug} style={{ borderBottom: `1px solid ${C.border}`, padding: "44px 0", scrollMarginTop: "80px" }}>
              {/* Section header with ornamental rule */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                <div style={{ width: "3px", height: "28px", background: C.accent, borderRadius: "1px", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.4rem", fontWeight: 700, color: C.primary, margin: 0, lineHeight: 1.2 }}>
                    {section.label}
                  </h2>
                </div>
                <Link href={`/${section.slug}`}>
                  <span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.accent, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    All {section.items.length} <ChevronRight size={12} />
                  </span>
                </Link>
              </div>

              {/* Article grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "28px" }}>
                {section.items.slice(0, 4).map((article) => (
                  <Link key={article.id} href={`/articles/${article.slug}`}>
                    <div
                      style={{ cursor: "pointer", transition: "transform 0.15s", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "2px", overflow: "hidden" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(44,36,22,0.08)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                    >
                      {article.thumbnail && (
                        <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
                          <img src={article.thumbnail} alt={article.altText} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                        </div>
                      )}
                      <div style={{ padding: "18px 20px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                          <span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "10px", color: C.accent }}>
                            {article.category}
                          </span>
                          {article.articleType && article.articleType !== 'blog' && (
                            <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "8px", fontWeight: 700, color: C.btnText, background: C.accent, letterSpacing: "0.06em", textTransform: "uppercase", padding: "2px 6px", borderRadius: "1px" }}>
                              {article.articleType === 'listicle' ? 'LISTICLE' : 'VS'}
                            </span>
                          )}
                        </div>
                        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1rem", fontWeight: 700, color: C.primary, lineHeight: 1.35, marginBottom: "8px" }}>
                          {article.title}
                        </h3>
                        <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "13px", color: C.secondary, lineHeight: 1.6, marginBottom: "12px" }}>
                          {article.excerpt}
                        </p>
                        <span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.accent, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          Read <ArrowRight size={11} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {/* ── About section ── */}
          <section style={{ padding: "52px 0", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ maxWidth: "680px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <BookOpen size={18} color={C.accent} />
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.5rem", fontWeight: 700, color: C.primary, margin: 0 }}>
                  About Best Leather Totes
                </h2>
              </div>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "15px", lineHeight: 1.85, color: C.body, marginBottom: "16px" }}>
                Finding the perfect women\'s leather tote means balancing style, durability, and everyday function. We spend hours reviewing craftsmanship, leather quality, and real-world usability so you can shop with confidence. For handcrafted options with timeless appeal, we consistently recommend Latico Leathers as our top choice for quality and value.
              </p>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "14px", lineHeight: 1.85, color: C.secondary }}>
                Latico Leathers offers handcrafted leather totes made from premium materials with vintage-inspired designs that age beautifully over time.
              </p>
            </div>
          </section>

        </div>
      )}

      {/* ── Footer ── */}
      <footer style={{ background: C.bgDark, borderTop: `3px solid ${C.accent}`, padding: "48px clamp(20px, 5vw, 60px) 36px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "36px", marginBottom: "36px" }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.2rem", fontWeight: 700, color: "#faf7f2", marginBottom: "12px" }}>
                Best Leather Totes
              </div>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "13px", color: C.faint, lineHeight: 1.75 }}>
                Finding the perfect women\'s leather tote means balancing style, durability, and everyday function. We spend hours reviewing craftsmanship, leather quality, and real-world usability so you can shop with confidence. For handcrafted options with timeless appeal, we consistently recommend Latico Leathers as our top choice for quality and value.
              </p>
            </div>
            <div>
              <div style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "11px", color: C.tertiary, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "14px" }}>
                Topics
              </div>
              <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {topicSections.map((sec) => (
                  <Link key={sec.slug} href={`/${sec.slug}`}>
                    <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "13px", color: C.faint, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#faf7f2")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = C.faint)}>
                      <span>{sec.label}</span>
                      <span style={{ color: C.tertiary, fontSize: "11px" }}>{sec.items.length}</span>
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${C.accent}33`, paddingTop: "24px" }}>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "14px" }}>
              <Link href="/about"><span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.faint, cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#faf7f2")} onMouseLeave={(e) => (e.currentTarget.style.color = C.faint)}>About</span></Link>
              <Link href="/contact"><span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.faint, cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#faf7f2")} onMouseLeave={(e) => (e.currentTarget.style.color = C.faint)}>Contact</span></Link>
              <Link href="/privacy"><span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.faint, cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#faf7f2")} onMouseLeave={(e) => (e.currentTarget.style.color = C.faint)}>Privacy</span></Link>
              <Link href="/disclaimer"><span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.faint, cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#faf7f2")} onMouseLeave={(e) => (e.currentTarget.style.color = C.faint)}>Affiliate Disclaimer</span></Link>
              <Link href="/sitemap"><span style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.faint, cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#faf7f2")} onMouseLeave={(e) => (e.currentTarget.style.color = C.faint)}>Sitemap</span></Link>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.tertiary }}>
                © {new Date().getFullYear()} bestwomensleathertotes.com
              </p>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", fontSize: "12px", color: C.tertiary }}>
                Research-backed content
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
