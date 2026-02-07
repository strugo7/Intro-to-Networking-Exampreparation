import React, { useState } from 'react';
import './OSIModule.css';

// Types
interface Layer {
  number: number;
  name: string;
  hebrewName: string;
  description: string;
  analogy: string;
  protocols: string[];
  pdu: string;
  devices: string[];
  functions: string[];
  icon: string;
}

// OSI Layers Data
const osiLayers: Layer[] = [
  {
    number: 7,
    name: 'Application',
    hebrewName: 'שכבת היישום',
    description: 'השכבה שבה האפליקציות שאנחנו משתמשים בהן מתקשרות עם הרשת',
    analogy: 'הקופאי בחנות - האדם שאיתו אנחנו מדברים ישירות',
    protocols: ['HTTP', 'HTTPS', 'FTP', 'SMTP', 'DNS', 'DHCP'],
    pdu: 'Data',
    devices: ['Application Gateway', 'Proxy Server'],
    functions: [
      'אינטראקציה ישירה עם המשתמש',
      'ממשק לאפליקציות רשת',
      'זיהוי וזמינות משאבים',
      'סנכרון תקשורת'
    ],
    icon: '💻'
  },
  {
    number: 6,
    name: 'Presentation',
    hebrewName: 'שכבת המצגת',
    description: 'אחראית על הצפנה, פענוח, דחיסה ותרגום פורמטים',
    analogy: 'מתרגם - ממיר את השפה שלך לשפה שהצד השני מבין',
    protocols: ['SSL/TLS', 'JPEG', 'GIF', 'ASCII', 'EBCDIC'],
    pdu: 'Data',
    devices: ['Gateway'],
    functions: [
      'הצפנה ופענוח',
      'דחיסה של מידע',
      'תרגום בין פורמטים',
      'המרת קידוד תווים'
    ],
    icon: '🔐'
  },
  {
    number: 5,
    name: 'Session',
    hebrewName: 'שכבת הפגישה',
    description: 'מנהלת חיבורים וסשנים בין אפליקציות',
    analogy: 'מזכירה שמתזמנת פגישות - דואגת שהשיחה תתחיל, תימשך ותיגמר כראוי',
    protocols: ['NetBIOS', 'RPC', 'PPTP'],
    pdu: 'Data',
    devices: ['Gateway'],
    functions: [
      'פתיחת חיבורים',
      'ניהול סשנים',
      'סגירת חיבורים',
      'סנכרון דיאלוג'
    ],
    icon: '🤝'
  },
  {
    number: 4,
    name: 'Transport',
    hebrewName: 'שכבת התעבורה',
    description: 'מבטיחה העברת מידע אמינה מקצה לקצה',
    analogy: 'שליח רשום - מוודא שהחבילה הגיעה שלמה וללא נזק',
    protocols: ['TCP', 'UDP'],
    pdu: 'Segment (TCP) / Datagram (UDP)',
    devices: ['Firewall (L4)'],
    functions: [
      'פילוח והרכבת מידע',
      'בקרת זרימה',
      'בקרת שגיאות',
      'מספרי Port'
    ],
    icon: '📦'
  },
  {
    number: 3,
    name: 'Network',
    hebrewName: 'שכבת הרשת',
    description: 'אחראית על ניתוב וכתובות לוגיות (IP)',
    analogy: 'GPS - מחליט על המסלול הטוב ביותר להגיע ליעד',
    protocols: ['IP', 'ICMP', 'ARP', 'OSPF', 'BGP'],
    pdu: 'Packet',
    devices: ['Router', 'Layer 3 Switch'],
    functions: [
      'כתובות IP',
      'ניתוב חבילות',
      'פיצול חבילות',
      'בחירת מסלול אופטימלי'
    ],
    icon: '🗺️'
  },
  {
    number: 2,
    name: 'Data Link',
    hebrewName: 'שכבת קישור הנתונים',
    description: 'מעבירה מידע בין צמתים סמוכים ברשת המקומית',
    analogy: 'רמזור - מווסת תנועה ומוודא שאין התנגשויות',
    protocols: ['Ethernet', 'Wi-Fi (802.11)', 'PPP'],
    pdu: 'Frame',
    devices: ['Switch', 'Bridge', 'NIC'],
    functions: [
      'כתובות MAC',
      'זיהוי שגיאות',
      'בקרת גישה למדיום',
      'Framing'
    ],
    icon: '🔗'
  },
  {
    number: 1,
    name: 'Physical',
    hebrewName: 'שכבת הפיזית',
    description: 'מטפלת בהעברה פיזית של ביטים',
    analogy: 'הכביש עצמו - התשתית שעליה נוסעות המכוניות',
    protocols: ['Ethernet Physical', '802.11 Physical', 'USB', 'Bluetooth'],
    pdu: 'Bits',
    devices: ['Hub', 'Repeater', 'Cables', 'NIC'],
    functions: [
      'המרת ביטים לאותות',
      'העברה במדיום הפיזי',
      'מפרט חומרה',
      'מתח וזרם'
    ],
    icon: '⚡'
  }
];

const OSIModule: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(7);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'encapsulation' | 'comparison'>('overview');

  const currentLayer = osiLayers.find(layer => layer.number === selectedLayer);

  return (
    <div className="osi-module" dir="rtl">
      {/* Header Section */}
      <header className="module-header">
        <h1>🌐 מודל OSI - מדריך מלא ואינטרקטיבי</h1>
        <p className="subtitle">
          הבנת המודל שמארגן את כל תהליכי התקשורת ברשתות מחשבים
        </p>
      </header>

      {/* Navigation Tabs */}
      <div className="tabs-navigation">
        <button 
          className={activeTab === 'overview' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('overview')}
        >
          סקירה כללית
        </button>
        <button 
          className={activeTab === 'encapsulation' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('encapsulation')}
        >
          Encapsulation - אריזת המידע
        </button>
        <button 
          className={activeTab === 'comparison' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('comparison')}
        >
          OSI vs TCP/IP
        </button>
      </div>

      {/* Content Based on Active Tab */}
      {activeTab === 'overview' && (
        <div className="content-section">
          {/* Introduction */}
          <section className="intro-section card">
            <h2>🎯 מהו מודל OSI?</h2>
            <p className="lead-text">
              <strong>OSI Model</strong> (Open Systems Interconnection) הוא מסגרת תיאורטית 
              שמחלקת את תהליך התקשורת ברשת ל-<span className="highlight">7 שכבות</span>. 
              כל שכבה אחראית על חלק ספציפי בתהליך.
            </p>
            
            <div className="why-osi">
              <h3>🤔 למה אנחנו צריכים את המודל הזה?</h3>
              <div className="reasons-grid">
                <div className="reason-card">
                  <div className="icon">📋</div>
                  <h4>סטנדרטיזציה</h4>
                  <p>מבטיח שכל היצרנים עובדים לפי אותן כללים</p>
                </div>
                <div className="reason-card">
                  <div className="icon">🧩</div>
                  <h4>הפרדת תפקידים</h4>
                  <p>כל שכבה עושה משימה אחת ועושה אותה טוב</p>
                </div>
                <div className="reason-card">
                  <div className="icon">🔧</div>
                  <h4>פיתוח ותיקון קל</h4>
                  <p>אפשר לשנות טכנולוגיה בשכבה אחת מבלי לגעת באחרות</p>
                </div>
                <div className="reason-card">
                  <div className="icon">🔍</div>
                  <h4>פתרון בעיות</h4>
                  <p>קל יותר לזהות היכן הבעיה ברשת</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Layers Visualization */}
          <section className="layers-section">
            <h2>🏗️ 7 השכבות של מודל OSI</h2>
            <p className="instruction">לחץ על כל שכבה כדי לקרוא עליה יותר</p>
            
            <div className="layers-container">
              {/* Left Side - Layer Cards */}
              <div className="layers-stack">
                {osiLayers.map((layer) => (
                  <div
                    key={layer.number}
                    className={`layer-card ${selectedLayer === layer.number ? 'selected' : ''}`}
                    onClick={() => setSelectedLayer(layer.number)}
                  >
                    <div className="layer-number">Layer {layer.number}</div>
                    <div className="layer-icon">{layer.icon}</div>
                    <div className="layer-info">
                      <h3>{layer.name}</h3>
                      <p className="hebrew-name">{layer.hebrewName}</p>
                      <span className="pdu-badge">{layer.pdu}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Side - Detailed Info */}
              {currentLayer && (
                <div className="layer-details card">
                  <div className="detail-header">
                    <span className="large-icon">{currentLayer.icon}</span>
                    <div>
                      <h2>{currentLayer.name} Layer</h2>
                      <h3>{currentLayer.hebrewName}</h3>
                      <span className="layer-badge">שכבה {currentLayer.number}</span>
                    </div>
                  </div>

                  <div className="detail-content">
                    <div className="detail-section">
                      <h4>📝 תיאור</h4>
                      <p>{currentLayer.description}</p>
                    </div>

                    <div className="detail-section analogy-section">
                      <h4>💡 אנלוגיה מעולם היומיום</h4>
                      <p className="analogy-text">{currentLayer.analogy}</p>
                    </div>

                    <div className="detail-section">
                      <h4>⚙️ תפקידים עיקריים</h4>
                      <ul className="functions-list">
                        {currentLayer.functions.map((func, idx) => (
                          <li key={idx}>{func}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="detail-grid">
                      <div className="detail-section">
                        <h4>📡 פרוטוקולים</h4>
                        <div className="tags">
                          {currentLayer.protocols.map((protocol, idx) => (
                            <span key={idx} className="tag protocol-tag">{protocol}</span>
                          ))}
                        </div>
                      </div>

                      <div className="detail-section">
                        <h4>🖥️ רכיבי רשת</h4>
                        <div className="tags">
                          {currentLayer.devices.map((device, idx) => (
                            <span key={idx} className="tag device-tag">{device}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="detail-section">
                      <h4>📦 יחידת מידע (PDU)</h4>
                      <div className="pdu-display">{currentLayer.pdu}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Quick Reference Table */}
          <section className="reference-table card">
            <h2>📊 טבלת התייחסות מהירה</h2>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>שכבה</th>
                    <th>שם</th>
                    <th>יחידת מידע</th>
                    <th>רכיבים</th>
                    <th>פרוטוקולים מרכזיים</th>
                  </tr>
                </thead>
                <tbody>
                  {osiLayers.map(layer => (
                    <tr key={layer.number}>
                      <td className="layer-num">L{layer.number}</td>
                      <td><strong>{layer.name}</strong><br/><small>{layer.hebrewName}</small></td>
                      <td><span className="pdu-badge-small">{layer.pdu}</span></td>
                      <td>{layer.devices.join(', ')}</td>
                      <td>{layer.protocols.slice(0, 3).join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'encapsulation' && (
        <div className="content-section">
          <section className="encapsulation-section">
            <h2>📬 מהו Encapsulation - אריזת מידע?</h2>
            
            {/* Letter Analogy */}
            <div className="card analogy-card">
              <h3>💌 אנלוגיה: שליחת מכתב בדואר</h3>
              <div className="letter-comparison">
                <div className="letter-box wrong">
                  <h4>❌ ללא מעטפה</h4>
                  <div className="letter-visual">
                    <div className="letter-content">
                      <p>שלום,</p>
                      <p>מוזמן לחתונה שלי!</p>
                      <p>נתראה,</p>
                      <p>יוסי</p>
                    </div>
                  </div>
                  <p className="explanation">המכתב לא יגיע! הדואר לא יודע לאן לשלוח</p>
                </div>

                <div className="letter-box correct">
                  <h4>✅ עם מעטפה</h4>
                  <div className="envelope-visual">
                    <div className="envelope-top">
                      <div className="stamp">בול</div>
                      <div className="address-block">
                        <strong>אל: דני כהן</strong><br/>
                        רחוב הרצל 42<br/>
                        תל אביב, 6100101
                      </div>
                      <div className="sender-block">
                        <small>מאת: יוסי לוי</small><br/>
                        <small>רחוב ביאליק 15</small><br/>
                        <small>חיפה, 3320301</small>
                      </div>
                    </div>
                    <div className="letter-content-inside">
                      מכתב בפנים
                    </div>
                  </div>
                  <p className="explanation">המכתב יגיע! יש כל המידע הנדרש</p>
                </div>
              </div>

              <div className="key-insight">
                <strong>💡 מה אנחנו למדים מזה?</strong>
                <p>
                  כדי לשלוח מידע, אי אפשר לשלוח רק את התוכן עצמו. 
                  צריך להוסיף מידע נוסף (headers) שמסביר למערכת ההעברה (דואר/רשת) 
                  איך לטפל במידע ולאן להעביר אותו.
                </p>
              </div>
            </div>

            {/* Data Encapsulation Process */}
            <div className="card process-card">
              <h3>🔄 תהליך ה-Encapsulation ברשת</h3>
              <p className="intro-text">
                כמו במכתב, גם ברשת לא שולחים רק את המידע הגולמי. 
                בכל שכבה מתווסף <strong>Header</strong> עם מידע חשוב:
              </p>

              <button 
                className="animate-btn"
                onClick={() => setShowAnimation(!showAnimation)}
              >
                {showAnimation ? '⏸️ עצור אנימציה' : '▶️ הצג תהליך אנימציה'}
              </button>

              <div className="encapsulation-flow">
                <div className={`flow-step ${showAnimation ? 'animate' : ''} step-7`}>
                  <div className="step-number">7</div>
                  <div className="step-content">
                    <h4>Application Layer</h4>
                    <div className="data-box">
                      <div className="data-content">
                        "שלום! מה נשמע?"
                      </div>
                    </div>
                    <p>התוכן המקורי - הודעה בפייסבוק</p>
                  </div>
                </div>

                <div className="arrow-down">⬇️</div>

                <div className={`flow-step ${showAnimation ? 'animate delay-1' : ''} step-4`}>
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Transport Layer</h4>
                    <div className="data-box">
                      <div className="header-box transport">TCP Header<br/>Port: 443</div>
                      <div className="data-content">
                        "שלום! מה נשמע?"
                      </div>
                    </div>
                    <p>הוספת מספרי Port ופילוח</p>
                  </div>
                </div>

                <div className="arrow-down">⬇️</div>

                <div className={`flow-step ${showAnimation ? 'animate delay-2' : ''} step-3`}>
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Network Layer</h4>
                    <div className="data-box">
                      <div className="header-box network">
                        IP Header<br/>
                        Src: 192.168.1.10<br/>
                        Dst: 157.240.1.35
                      </div>
                      <div className="header-box transport">TCP</div>
                      <div className="data-content">
                        "שלום!"
                      </div>
                    </div>
                    <p>הוספת כתובות IP - מקור ויעד</p>
                  </div>
                </div>

                <div className="arrow-down">⬇️</div>

                <div className={`flow-step ${showAnimation ? 'animate delay-3' : ''} step-2`}>
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Data Link Layer</h4>
                    <div className="data-box">
                      <div className="header-box datalink">
                        Ethernet Header<br/>
                        Src MAC: AA:BB:CC<br/>
                        Dst MAC: DD:EE:FF
                      </div>
                      <div className="header-box network">IP</div>
                      <div className="header-box transport">TCP</div>
                      <div className="data-content">Data</div>
                      <div className="trailer-box">FCS</div>
                    </div>
                    <p>הוספת כתובות MAC + Frame Check Sequence</p>
                  </div>
                </div>

                <div className="arrow-down">⬇️</div>

                <div className={`flow-step ${showAnimation ? 'animate delay-4' : ''} step-1`}>
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Physical Layer</h4>
                    <div className="data-box">
                      <div className="bits-display">
                        01001000 01100101 01101100 01101100 01101111...
                      </div>
                    </div>
                    <p>המרה לביטים והעברה פיזית בכבל/אוויר</p>
                  </div>
                </div>
              </div>

              <div className="reverse-process">
                <h4>🔙 תהליך הפוך ביעד - De-encapsulation</h4>
                <p>
                  כשהמידע מגיע ליעד, כל שכבה מסירה את ה-Header שלה עד שנשאר רק המידע המקורי 
                  שמגיע לאפליקציה (פייסבוק).
                </p>
              </div>
            </div>

            {/* Real World Example */}
            <div className="card example-card">
              <h3>🌍 דוגמה מהחיים האמיתיים</h3>
              <div className="example-scenario">
                <div className="scenario-header">
                  <span className="scenario-icon">📱</span>
                  <div>
                    <h4>תרחיש: שליחת הודעת WhatsApp</h4>
                    <p>בואו נעקוב אחרי ההודעה "מה קורה?" שאתה שולח לחבר</p>
                  </div>
                </div>

                <div className="journey-steps">
                  <div className="journey-step">
                    <strong>1. Application (L7):</strong> אתה כותב "מה קורה?" ב-WhatsApp ולוחץ שלח
                  </div>
                  <div className="journey-step">
                    <strong>2. Transport (L4):</strong> WhatsApp מוסיף Port מספר (443 ל-HTTPS)
                  </div>
                  <div className="journey-step">
                    <strong>3. Network (L3):</strong> מערכת ההפעלה מוסיפה:
                    <ul>
                      <li>IP שלך (192.168.1.100)</li>
                      <li>IP של שרת WhatsApp</li>
                    </ul>
                  </div>
                  <div className="journey-step">
                    <strong>4. Data Link (L2):</strong> כרטיס הרשת מוסיף:
                    <ul>
                      <li>MAC Address של הטלפון שלך</li>
                      <li>MAC Address של ה-Router</li>
                    </ul>
                  </div>
                  <div className="journey-step">
                    <strong>5. Physical (L1):</strong> המידע הופך לאותות חשמליים/אלחוטיים ונשלח
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="content-section">
          <section className="comparison-section">
            <h2>⚖️ OSI Model vs TCP/IP Model</h2>

            <div className="card intro-card">
              <h3>🤔 מדוע שני מודלים?</h3>
              <p>
                מודל OSI הוא <strong>תיאורטי ואקדמי</strong> - מצוין ללמידה והבנה, 
                אבל בפועל רוב מהנדסי הרשת השתמשו במודל פשוט יותר שמתמקד בשכבות 1-4 
                שרלוונטיות לעבודה היומיומית. כך נולד <strong>מודל TCP/IP</strong>.
              </p>
            </div>

            <div className="models-comparison">
              <div className="model-column">
                <h3>OSI Model</h3>
                <div className="model-info">
                  <div className="info-item">📚 7 שכבות</div>
                  <div className="info-item">🎓 תיאורטי</div>
                  <div className="info-item">📖 לימודי</div>
                </div>
                <div className="model-layers">
                  {osiLayers.map(layer => (
                    <div key={layer.number} className="model-layer osi">
                      <span className="layer-num">L{layer.number}</span>
                      <span className="layer-name">{layer.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mapping-arrows">
                <div className="arrow-group top">
                  <div className="arrow">→</div>
                  <div className="merge-label">ממוזגים ל-Application</div>
                </div>
                <div className="arrow-group middle">
                  <div className="arrow">→</div>
                  <div className="arrow">→</div>
                  <div className="arrow">→</div>
                  <div className="arrow">→</div>
                  <div className="same-label">זהות</div>
                </div>
              </div>

              <div className="model-column">
                <h3>TCP/IP Model (מודרני)</h3>
                <div className="model-info">
                  <div className="info-item">📊 5 שכבות</div>
                  <div className="info-item">⚙️ מעשי</div>
                  <div className="info-item">🌐 בשימוש</div>
                </div>
                <div className="model-layers tcpip">
                  <div className="model-layer tcpip application">
                    <span className="layer-num">L5</span>
                    <span className="layer-name">Application</span>
                  </div>
                  <div className="model-layer tcpip">
                    <span className="layer-num">L4</span>
                    <span className="layer-name">Transport</span>
                  </div>
                  <div className="model-layer tcpip">
                    <span className="layer-num">L3</span>
                    <span className="layer-name">Network</span>
                  </div>
                  <div className="model-layer tcpip">
                    <span className="layer-num">L2</span>
                    <span className="layer-name">Data Link</span>
                  </div>
                  <div className="model-layer tcpip">
                    <span className="layer-num">L1</span>
                    <span className="layer-name">Physical</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card comparison-table-card">
              <h3>📋 השוואה מפורטת</h3>
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>נקודת השוואה</th>
                    <th>OSI Model</th>
                    <th>TCP/IP Model</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>מספר שכבות</td>
                    <td>7</td>
                    <td>5 (בגרסה המודרנית)</td>
                  </tr>
                  <tr>
                    <td>פיתוח</td>
                    <td>ISO (ארגון בינלאומי)</td>
                    <td>DoD (משרד ההגנה האמריקאי)</td>
                  </tr>
                  <tr>
                    <td>שימוש</td>
                    <td>תיאורטי ולימודי</td>
                    <td>מעשי - בשימוש באינטרנט</td>
                  </tr>
                  <tr>
                    <td>גמישות</td>
                    <td>גמיש מאוד</td>
                    <td>פחות גמיש, ספציפי יותר</td>
                  </tr>
                  <tr>
                    <td>שכבות עליונות</td>
                    <td>Application, Presentation, Session</td>
                    <td>Application (כולל הכל)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card important-note">
              <h3>⚠️ חשוב לדעת!</h3>
              <ul className="important-list">
                <li>
                  <strong>בבחינת CCNA:</strong> המודל כבר לא מרכזי כמו פעם, אבל חשוב להבין אותו
                </li>
                <li>
                  <strong>בשטח:</strong> מהנדסים משתמשים במספרי השכבות של OSI! 
                  למשל: "זה Switch של Layer 2" או "הבעיה היא ב-Layer 3"
                </li>
                <li>
                  <strong>מינוח:</strong> כששומעים "Layer 7 protocol" מתכוונים ל-Application Layer 
                  (גם אם ב-TCP/IP זו שכבה 5)
                </li>
                <li>
                  <strong>4 השכבות התחתונות:</strong> זהות בשני המודלים! רק השכבות העליונות שונות
                </li>
              </ul>
            </div>

            <div className="card real-world-card">
              <h3>🎯 איך משתמשים בזה בפועל?</h3>
              <div className="real-world-examples">
                <div className="example-box">
                  <h4>שאלה נפוצה בעבודה:</h4>
                  <p className="question">"אתה צריך Switch של L2 או L3?"</p>
                  <p className="answer">
                    <strong>התשובה:</strong><br/>
                    <strong>L2 Switch</strong> - עובד בשכבת Data Link, מחליט לפי MAC Address<br/>
                    <strong>L3 Switch</strong> - עובד גם בשכבת Network, יכול לנתב לפי IP
                  </p>
                </div>

                <div className="example-box">
                  <h4>פתרון בעיות:</h4>
                  <p className="question">"המחשב לא מתחבר לרשת"</p>
                  <p className="answer">
                    <strong>חשיבה בשכבות:</strong><br/>
                    L1: הכבל מחובר? ✓<br/>
                    L2: Switch עובד? ✓<br/>
                    L3: יש IP? ✗ ← הבעיה כאן!
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Quiz Section */}
      <section className="quiz-section card">
        <h2>🎓 בדוק את עצמך</h2>
        <div className="quiz-questions">
          <div className="quiz-question">
            <p><strong>1. באיזו שכבה פועל Router?</strong></p>
            <div className="quiz-options">
              <button className="quiz-option">Application Layer</button>
              <button className="quiz-option">Transport Layer</button>
              <button className="quiz-option correct">Network Layer ✓</button>
              <button className="quiz-option">Data Link Layer</button>
            </div>
          </div>

          <div className="quiz-question">
            <p><strong>2. מהי יחידת המידע (PDU) בשכבת Transport?</strong></p>
            <div className="quiz-options">
              <button className="quiz-option">Packet</button>
              <button className="quiz-option correct">Segment / Datagram ✓</button>
              <button className="quiz-option">Frame</button>
              <button className="quiz-option">Bits</button>
            </div>
          </div>

          <div className="quiz-question">
            <p><strong>3. איזה פרוטוקול פועל בשכבת Application?</strong></p>
            <div className="quiz-options">
              <button className="quiz-option">TCP</button>
              <button className="quiz-option">IP</button>
              <button className="quiz-option correct">HTTP ✓</button>
              <button className="quiz-option">Ethernet</button>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="summary-section card">
        <h2>📌 סיכום מהיר</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <div className="summary-icon">🎯</div>
            <h4>מטרת המודל</h4>
            <p>סטנדרטיזציה ופישוט של תהליכי תקשורת</p>
          </div>
          <div className="summary-item">
            <div className="summary-icon">7️⃣</div>
            <h4>7 שכבות</h4>
            <p>כל שכבה עם תפקיד ספציפי</p>
          </div>
          <div className="summary-item">
            <div className="summary-icon">📦</div>
            <h4>Encapsulation</h4>
            <p>כל שכבה מוסיפה Header למידע</p>
          </div>
          <div className="summary-item">
            <div className="summary-icon">🔧</div>
            <h4>מודולריות</h4>
            <p>שינוי בשכבה אחת לא משפיע על האחרות</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OSIModule;
