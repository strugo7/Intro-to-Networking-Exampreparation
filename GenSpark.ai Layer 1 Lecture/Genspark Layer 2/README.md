# 🌐 NetLearn — שיעורים אינטראקטיביים על מודל OSI

## 📋 תיאור הפרויקט
פלטפורמת למידה אינטראקטיבית עם אנימציות Canvas מרהיבות, המסבירה את מודל ה-OSI שכבה אחר שכבה. הפרויקט כולל שיעורים מלאים, כלים אינטראקטיביים, בחנים ומילון מונחים.

## ✅ פיצ'רים שהושלמו

### שכבה 1 — Physical Layer (`index.html`)
- **מבוא** — הסבר על מודל OSI ותפקיד השכבה הפיזית
- **סיבים אופטיים** — אנימציית Single/Multi Mode, חתך רוחב אינטראקטיבי
- **כבלי נחושת** — אות חשמלי אינטראקטיבי, UTP/STP/Coaxial, טבלת קטגוריות
- **WiFi** — סימולציית שידור, עוצמת אות, תדרים, ציר זמן דורות WiFi
- **השוואה** — טבלת השוואה, כרטיסיות תרחישים, מרוץ מהירויות
- **בוחן** — 10 שאלות עם משוב מיידי
- Canvas אנימציות (חלקיקים, אותות, גלים), ניווט מקלדת וסוויפ

### שכבה 2 — Data Link Layer (`layer2.html`) 🆕
- **מבוא** — תפקיד שכבה 2, מודל OSI, מסע Frame אנימטיבי, תת-שכבות LLC/MAC, רכיבים ופרוטוקולים
- **Ethernet ו-MAC** — מבנה מסגרת Ethernet (Preamble→SFD→MAC→Type→Payload→FCS), כתובת MAC (48 ביט, OUI/Device), סוגי כתובות (Unicast/Broadcast/Multicast), ARP עם אנימציה
- **Switching** — Hub vs Switch, 5 שלבי למידת MAC (Learn/Forward/Flood/Filter), **סימולטור MAC Table אינטראקטיבי** עם טבלה בזמן אמת ולוג פעולות
- **STP (Spanning Tree Protocol)** — בעיית Loops (Broadcast Storm, MAC Instability, Duplicate Frames), תהליך STP בארבעה שלבים (Root Bridge → Root Port → Designated → Blocked), מצבי פורט (Blocking→Listening→Learning→Forwarding), **סימולטור STP חי** עם אפשרות לנתק קישור ולראות reconvergence, RSTP
- **VLAN** — הגדרה ויתרונות (אבטחה, ביצועים, ניהול, חיסכון), **Canvas של רשת ארגונית** עם 4 VLANs, Access vs Trunk Ports, 802.1Q Tagging, Inter-VLAN Routing (Router-on-a-Stick / SVI), **סימולטור VLAN** שמדגים שליחה בתוך/בין VLANs
- **בוחן** — 15 שאלות מקיפות עם משוב מיידי
- Canvas אנימציות (רשת חלקיקים, מסע Frame, ARP, MAC Table learning, STP election, VLAN corporate)

### שכבה 3 — Network Layer (`layer3.html`)
- **מבוא** — הסבר על שכבת הרשת, מודל OSI, מסע חבילה אנימטיבי
- **כתובות IP** — מבנה IPv4, מחלקות A/B/C, כתובות פרטיות/ציבוריות, NAT
- **המרה בינארית** — ממיר Bit Toggle אינטראקטיבי, ממיר IP מלא, שיטת המרה צעד-אחר-צעד
- **Subnetting** — Subnet Mask ויזואלי עם Slider CIDR, מחשבון Subnetting מתקדם, טבלת Cheat Sheet, מדריך שלב-אחר-שלב לחישוב כתובת רשת, Broadcast וטווח מארחים
- **ניתוב** — הסבר מקיף על סוגי ניתוב (Direct/Static/Dynamic/Default), סימולטורי Canvas אינטראקטיביים לכל סוג, טבלת ניתוב אינטראקטיבית, Longest Prefix Match (LPM) אנימטיבי
- **פרוטוקולי ניתוב** — הסבר על OSPF Cost (מה זה, נוסחה, טבלת ערכים), הסבר מעמיק על AS (Autonomous System) עם Canvas ויזואלי, RIP/OSPF/BGP עם אנימציות Canvas, טבלת השוואה מפורטת
- **בוחן** — 15 שאלות מקיפות עם משוב מיידי וניקוד ויזואלי
- Canvas אנימציות (רשת חלקיקים, מסע חבילות, Direct/Static/Dynamic simulators, AS visualization, Dijkstra, BGP routing)

### מילון מונחים (`glossary.html`)
- חיפוש חופשי, ניווט אלפביתי A-Z
- פילטרים לפי קטגוריות (All, Protocols, Hardware, Models)
- כרטיסי מונחים נפתחים עם הסברים בעברית ובאנגלית
- הדמיית ARP ויזואלית
- מונחים קשורים

## 📂 מבנה הפרויקט

```
index.html              → שיעור שכבה 1 (Physical Layer)
layer2.html             → שיעור שכבה 2 (Data Link Layer) 🆕
layer3.html             → שיעור שכבה 3 (Network Layer)
glossary.html           → מילון מונחים
README.md               → תיעוד הפרויקט
css/
  ├── style.css         → עיצוב שכבה 1
  ├── layer2.css        → עיצוב שכבה 2 🆕
  └── layer3.css        → עיצוב שכבה 3
js/
  ├── animations.js     → אנימציות Canvas שכבה 1
  ├── quiz.js           → בוחן שכבה 1
  ├── main.js           → לוגיקה ראשית שכבה 1
  ├── layer2-animations.js → אנימציות Canvas שכבה 2 🆕
  ├── layer2-quiz.js    → בוחן שכבה 2 (15 שאלות) 🆕
  ├── layer2-main.js    → לוגיקה ראשית שכבה 2 🆕
  ├── layer3-animations.js → אנימציות Canvas שכבה 3
  ├── layer3-quiz.js    → בוחן שכבה 3 (15 שאלות)
  └── layer3-main.js    → לוגיקה ראשית שכבה 3
reference/
  └── Glossery.html     → קובץ ייחוס מקורי
```

## 🔗 נתיבי כניסה

| עמוד | נתיב | תיאור |
|------|------|-------|
| שכבה פיזית | `/index.html` | שיעור אינטראקטיבי על Layer 1 |
| שכבת קישור הנתונים | `/layer2.html` | שיעור אינטראקטיבי על Layer 2 🆕 |
| שכבת הרשת | `/layer3.html` | שיעור אינטראקטיבי על Layer 3 |
| מילון מונחים | `/glossary.html` | מילון מונחי רשתות A-Z |

## 🧭 ניווט חוצה-עמודים
כל עמוד מכיל קישורים ישירים ל:
- שכבה 1 (Physical)
- שכבה 2 (Data Link)
- שכבה 3 (Network)
- מילון מונחים (Glossary)

## 🛠 טכנולוגיות
- HTML5 Canvas API
- CSS3 עם Custom Properties (CSS Variables)
- JavaScript Vanilla (ללא Framework)
- Google Fonts (Heebo, IBM Plex Mono)
- Font Awesome Icons (CDN)
- Tailwind CSS (glossary בלבד)

## 📌 פיצ'רים שלא הושלמו עדיין
- שכבה 4 — Transport Layer (TCP/UDP, Ports, Three-Way Handshake)
- שכבות 5-7 (Session, Presentation, Application)
- Labs / תרגולים מעשיים
- מערכת קהילה (Community)
- שמירת התקדמות המשתמש (LocalStorage)

## 🚀 צעדים הבאים מומלצים
1. הוספת שיעור שכבה 4 (Transport Layer) — TCP/UDP, Ports, Three-Way Handshake
2. הוספת שיעור שכבות 5-7 (Application layers)
3. הוספת Labs עם תרגולים מעשיים בכל שכבה
4. שמירת התקדמות בוחנים ב-LocalStorage
5. Dark/Light mode toggle
6. תמיכה מלאה ב-IPv6 בכלים האינטראקטיביים
