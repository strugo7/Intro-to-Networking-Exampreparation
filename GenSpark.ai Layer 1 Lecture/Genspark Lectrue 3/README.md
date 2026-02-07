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

### שכבה 3 — Network Layer (`layer3.html`)
- **מבוא** — הסבר על שכבת הרשת, מודל OSI, מסע חבילה אנימטיבי
- **כתובות IP** — מבנה IPv4, מחלקות A/B/C, כתובות פרטיות/ציבוריות, NAT
- **המרה בינארית** — ממיר Bit Toggle אינטראקטיבי, ממיר IP מלא, שיטת המרה צעד-אחר-צעד
- **Subnetting** — Subnet Mask ויזואלי עם Slider CIDR, מחשבון Subnetting מתקדם, טבלת Cheat Sheet, מדריך שלב-אחר-שלב לחישוב כתובת רשת, Broadcast וטווח מארחים
- **ניתוב** — הסבר מקיף על סוגי ניתוב (Direct/Static/Dynamic/Default), סימולטורי Canvas אינטראקטיביים לכל סוג, טבלת ניתוב אינטראקטיבית, Longest Prefix Match (LPM) אנימטיבי
- **פרוטוקולי ניתוב** — הסבר מעמיק על AS (Autonomous System) עם Canvas ויזואלי, RIP/OSPF/BGP עם אנימציות Canvas, טבלת השוואה מפורטת
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
layer3.html             → שיעור שכבה 3 (Network Layer)
glossary.html           → מילון מונחים
README.md               → תיעוד הפרויקט
css/
  ├── style.css         → עיצוב שכבה 1
  └── layer3.css        → עיצוב שכבה 3
js/
  ├── animations.js     → אנימציות Canvas שכבה 1
  ├── quiz.js           → בוחן שכבה 1
  ├── main.js           → לוגיקה ראשית שכבה 1
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
| שכבת הרשת | `/layer3.html` | שיעור אינטראקטיבי על Layer 3 |
| מילון מונחים | `/glossary.html` | מילון מונחי רשתות A-Z |

## 🛠 טכנולוגיות
- HTML5 Canvas API
- CSS3 עם Custom Properties (CSS Variables)
- JavaScript Vanilla (ללא Framework)
- Google Fonts (Heebo, IBM Plex Mono)
- Font Awesome Icons (CDN)
- Tailwind CSS (glossary בלבד)

## 📌 פיצ'רים שלא הושלמו עדיין
- שכבה 2 — Data Link Layer
- שכבה 4 — Transport Layer
- שכבות 5-7 (Session, Presentation, Application)
- Labs / תרגולים מעשיים
- מערכת קהילה (Community)
- שמירת התקדמות המשתמש (LocalStorage)

## 🚀 צעדים הבאים מומלצים
1. הוספת שיעור שכבה 2 (Data Link Layer) — MAC addresses, Switching, VLANs
2. הוספת שיעור שכבה 4 (Transport Layer) — TCP/UDP, Ports, Three-Way Handshake
3. הוספת Labs עם תרגולים מעשיים בכל שכבה
4. שמירת התקדמות בוחנים ב-LocalStorage
5. Dark/Light mode toggle
6. תמיכה מלאה ב-IPv6 בכלים האינטראקטיביים
