import React from 'react';
import OSIModule from './components/OSIModule/OSIModule';
import './App.css';

/**
 * Example App Component
 * דוגמה לשימוש במודול OSI
 */
function App() {
  return (
    <div className="App">
      {/* Navigation Bar - Optional */}
      <nav className="app-navigation">
        <div className="nav-container">
          <h1 className="app-title">🎓 אתר למידת תקשורת מחשבים</h1>
          <div className="nav-links">
            <a href="#home">דף הבית</a>
            <a href="#modules">מודולים</a>
            <a href="#practice">תרגול</a>
            <a href="#glossary">מילון</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="app-main">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <a href="#home">דף הבית</a>
          <span> / </span>
          <a href="#modules">מודולים</a>
          <span> / </span>
          <span className="current">מודל OSI</span>
        </div>

        {/* OSI Module Component */}
        <OSIModule />

        {/* Additional Resources Section */}
        <section className="additional-resources">
          <div className="resources-container">
            <h2>📚 משאבים נוספים</h2>
            <div className="resources-grid">
              <div className="resource-card">
                <h3>🎬 סרטוני הסבר</h3>
                <p>צפה בסרטוני YouTube שמסבירים את מודל ה-OSI</p>
                <button className="resource-btn">צפה בסרטונים</button>
              </div>
              <div className="resource-card">
                <h3>📝 תרגילים נוספים</h3>
                <p>תרגול מעמיק על כל שכבה ושכבה</p>
                <button className="resource-btn">עבור לתרגילים</button>
              </div>
              <div className="resource-card">
                <h3>💬 פורום דיונים</h3>
                <p>שתף שאלות והצטרף לדיונים עם סטודנטים אחרים</p>
                <button className="resource-btn">הצטרף לפורום</button>
              </div>
            </div>
          </div>
        </section>

        {/* Next Module Suggestion */}
        <section className="next-module">
          <div className="next-module-container">
            <h3>המשך ללמוד ⬅️</h3>
            <div className="next-module-card">
              <div className="next-module-icon">🌐</div>
              <div className="next-module-content">
                <h4>המודול הבא: שכבת Application</h4>
                <p>למד על הפרוטוקולים שפועלים בשכבה העליונה: HTTP, DNS, DHCP ועוד</p>
                <button className="next-btn">התחל ללמוד →</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>על האתר</h4>
            <p>אתר למידה אינטרקטיבי לקורס מבוא לתקשורת מחשבים</p>
          </div>
          <div className="footer-section">
            <h4>קישורים מהירים</h4>
            <ul>
              <li><a href="#about">אודות</a></li>
              <li><a href="#contact">צור קשר</a></li>
              <li><a href="#privacy">מדיניות פרטיות</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>עקוב אחרינו</h4>
            <div className="social-links">
              <a href="#facebook">Facebook</a>
              <a href="#twitter">Twitter</a>
              <a href="#linkedin">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 אתר למידת תקשורת מחשבים. כל הזכויות שמורות.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
