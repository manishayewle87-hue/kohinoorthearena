import React from "react";

export default function Philosophy() {
  return (
    <section className="philosophy-section section-padding" id="philosophy">
      <div className="container">
        <div className="text-center">
          <span className="badge-purple">&bull; THE ARENA PHILOSOPHY &bull;</span>
          <h2 className="section-title">
            LIFE IS MOVING. <span className="highlight-neon">WE ARE NOT.</span>
          </h2>
          <p className="section-subtitle">
            Why Pimpri requires a paradigm shift from traditional residential
            apartments to an integrated athletic operating system.
          </p>
        </div>

        <div className="philosophy-grid">
          {/* Left: The Routine Problem */}
          <div className="philosophy-card problem" data-reveal data-delay="1">
            <div>
              <span className="card-tag">THE URBAN ROUTINE</span>
              <h3>
                A CITY THAT NEVER STOPS.<br />
                <span style={{ color: "#94A3B8" }}>A LIFE THAT BARELY MOVES.</span>
              </h3>
              <ul className="philosophy-list">
                <li>
                  <i className="ri-close-circle-fill"></i>{" "}
                  <span>Pune is driven by effort, ambition, and constant responsibility.</span>
                </li>
                <li>
                  <i className="ri-close-circle-fill"></i>{" "}
                  <span>Long work hours and daily commutes shape the pace of life.</span>
                </li>
                <li>
                  <i className="ri-close-circle-fill"></i>{" "}
                  <span>Evenings extend and personal family time feels limited.</span>
                </li>
                <li>
                  <i className="ri-close-circle-fill"></i>{" "}
                  <span>Play becomes occasional and physical energy feels distant.</span>
                </li>
                <li>
                  <i className="ri-close-circle-fill"></i>{" "}
                  <span>Health, recreation, and movement shift to &quot;later&quot; in the routine.</span>
                </li>
              </ul>
            </div>
            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                background: "rgba(255, 255, 255, 0.04)",
                borderRadius: "8px",
                fontSize: "0.88rem",
                color: "#CBD5E1",
              }}
            >
              <i className="ri-smartphone-line" style={{ color: "#F87171" }}></i>{" "}
              <em>&quot;Work expands into evenings. Screens steal time. This is the new stillness.&quot;</em>
            </div>
          </div>

          {/* Right: The Arena Solution */}
          <div className="philosophy-card solution" data-reveal data-delay="3">
            <div>
              <span className="card-tag">THE ARENA SOLUTION</span>
              <h3>
                IT NEEDS A <span className="highlight-neon">SPORTS TOWNSHIP.</span>
              </h3>
              <ul className="philosophy-list">
                <li>
                  <i className="ri-checkbox-circle-fill"></i>{" "}
                  <span>An 80,000 sq. ft. ecosystem designed for daily consistency and ease.</span>
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i>{" "}
                  <span>Access to FIFA football turf, tennis, padel &amp; pools right at your doorstep.</span>
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i>{" "}
                  <span>A professionally run sports club operated by ILESEUM Sports Management.</span>
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i>{" "}
                  <span>Structured coaching environments that bring routine to family fitness.</span>
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i>{" "}
                  <span>Daily access that removes the need to plan, commute, or schedule for fitness.</span>
                </li>
              </ul>
            </div>
            <div className="system-quote">
              &ldquo;We don&rsquo;t lack motivation. We lack a system. Mahalaxmi The
              Arena is that system.&rdquo;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
