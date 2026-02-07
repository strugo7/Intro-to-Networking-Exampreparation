
import { GlossaryTerm } from '../types';

export const glossaryData: GlossaryTerm[] = [
    // === A ===
    {
        term: "ACL",
        fullName: "Access Control List",
        category: "Security",
        layer: "",
        definitionEn: "A set of rules applied to network interfaces or devices that filter traffic based on source/destination IP addresses, ports, and protocols. ACLs are used to control which packets are permitted or denied through a network device.",
        definitionHe: "רשימת בקרת גישה (ACL) היא סט של כללים המיושמים על ממשקי רשת או מכשירים המסננים תעבורה על סמך כתובות IP מקור/יעד, פורטים ופרוטוקולים. ACL משמש לשליטה באילו חבילות מותרות או נחסמות.",
        relatedTerms: ["Firewall", "NAT", "Packet Filtering"],
        visualization: null
    },
    {
        term: "ARP",
        fullName: "Address Resolution Protocol",
        category: "Protocol",
        layer: "Layer 2/3",
        definitionEn: "A communication protocol used for discovering the link layer address, such as a <strong>MAC address</strong>, associated with a given internet layer address, typically an <strong>IPv4 address</strong>. This mapping is a critical function in the Internet Protocol Suite.",
        definitionHe: "פרוטוקול המיפוי (ARP) הוא פרוטוקול תקשורת המשמש לגילוי כתובת שכבת הקישור, כגון כתובת <strong>MAC</strong>, המשוייכת לכתובת שכבת האינטרנט נתונה, בדרך כלל כתובת <strong>IPv4</strong>. מיפוי זה הוא פונקציה קריטית בחבילת פרוטוקולי האינטרנט.",
        relatedTerms: ["IP Address", "MAC Address", "RARP"],
        visualization: {
            type: "arp-table",
            data: [
                { ip: "192.168.1.1", mac: "00:1A:2B:3C:4D:5E", type: "Dynamic" },
                { ip: "192.168.1.15", mac: "AA:BB:CC:11:22:33", type: "Dynamic" }
            ]
        }
    },
    // === B ===
    {
        term: "BGP",
        fullName: "Border Gateway Protocol",
        category: "Protocol",
        layer: "Layer 7",
        definitionEn: "The protocol underlying the global routing system of the Internet. It manages how packets are routed across the internet through the exchange of routing information between <strong>Autonomous Systems (AS)</strong>. BGP is classified as a path-vector routing protocol.",
        definitionHe: "BGP הוא הפרוטוקול שעומד בבסיס מערכת הניתוב הגלובלית של האינטרנט. הוא מנהל כיצד חבילות מנותבות ברחבי האינטרנט באמצעות חילופי מידע ניתוב בין <strong>מערכות אוטונומיות (AS)</strong>.",
        relatedTerms: ["OSPF", "Routing Table", "AS"],
        visualization: {
            type: "routing",
            data: [
                { as: "AS 64501", prefix: "10.0.0.0/8", nextHop: "192.168.1.1" },
                { as: "AS 64502", prefix: "172.16.0.0/12", nextHop: "192.168.2.1" }
            ]
        }
    },
    {
        term: "Bandwidth",
        fullName: "Maximum rate of data transfer",
        category: "General",
        layer: "",
        definitionEn: "The maximum amount of data that can be transmitted over a network connection in a given amount of time. Measured in <strong>bits per second (bps)</strong>. Common measurements include Mbps and Gbps. Not to be confused with throughput, which is the actual achieved rate.",
        definitionHe: "רוחב פס הוא כמות הנתונים המקסימלית שניתן להעביר דרך חיבור רשת בפרק זמן נתון. נמדד ב<strong>ביטים לשנייה (bps)</strong>. יחידות נפוצות כוללות Mbps ו-Gbps. אין לבלבל עם תפוקה (throughput) שהיא הקצב בפועל.",
        relatedTerms: ["Throughput", "Latency", "QoS"],
        visualization: {
            type: "bandwidth",
            data: { download: 940, upload: 480, unit: "Mbps" }
        }
    },
    {
        term: "Bridge",
        fullName: "Network Bridge",
        category: "Hardware",
        layer: "Layer 2",
        definitionEn: "A network device that connects two or more network segments at the <strong>Data Link Layer</strong> (Layer 2). It filters traffic based on MAC addresses and forwards frames between segments, effectively reducing collision domains.",
        definitionHe: "גשר רשת הוא התקן רשת המחבר שני מקטעי רשת או יותר ב<strong>שכבת קישור הנתונים</strong> (שכבה 2). הוא מסנן תעבורה על סמך כתובות MAC ומעביר מסגרות בין מקטעים.",
        relatedTerms: ["Switch", "MAC Address", "VLAN"],
        visualization: null
    },
    // === C ===
    {
        term: "CIDR",
        fullName: "Classless Inter-Domain Routing",
        category: "Addressing",
        layer: "Layer 3",
        definitionEn: "A method of IP address allocation and routing that replaces the older classful addressing system. CIDR notation uses a <strong>suffix</strong> (e.g., /24) to indicate the number of bits in the network portion of the address, enabling more efficient use of IP address space.",
        definitionHe: "CIDR הוא שיטה להקצאת כתובות IP וניתוב שמחליפה את מערכת הכיתות הישנה. סימון CIDR משתמש ב<strong>סיפא</strong> (לדוגמה /24) לציון מספר הביטים בחלק הרשת של הכתובת, ומאפשר שימוש יעיל יותר במרחב כתובות ה-IP.",
        relatedTerms: ["Subnet Mask", "IP Address", "VLSM"],
        visualization: {
            type: "cidr",
            data: [
                { cidr: "192.168.1.0/24", hosts: 254, mask: "255.255.255.0" },
                { cidr: "10.0.0.0/8", hosts: "16M+", mask: "255.0.0.0" },
                { cidr: "172.16.0.0/16", hosts: "65K+", mask: "255.255.0.0" }
            ]
        }
    },
    // === D ===
    {
        term: "DHCP",
        fullName: "Dynamic Host Configuration Protocol",
        category: "Protocol",
        layer: "Layer 7",
        definitionEn: "A network management protocol used to dynamically assign <strong>IP addresses</strong> and other network configuration parameters to devices on a network. This allows devices to communicate using TCP/IP without manual configuration.",
        definitionHe: "DHCP הוא פרוטוקול ניהול רשת המשמש להקצאה דינמית של <strong>כתובות IP</strong> ופרמטרי תצורת רשת נוספים להתקנים ברשת. פרוטוקול זה מאפשר להתקנים לתקשר באמצעות TCP/IP ללא הגדרה ידנית.",
        relatedTerms: ["IP Address", "DNS", "APIPA"],
        visualization: {
            type: "dhcp-flow",
            steps: ["Discover", "Offer", "Request", "Acknowledge"]
        }
    },
    {
        term: "DNS",
        fullName: "Domain Name System",
        category: "Protocol",
        layer: "Layer 7",
        definitionEn: "A hierarchical and distributed naming system that translates human-readable <strong>domain names</strong> (like www.example.com) into <strong>IP addresses</strong> (like 93.184.216.34). Often called the 'phone book of the Internet'.",
        definitionHe: "DNS הוא מערכת שמות היררכית ומבוזרת שמתרגמת <strong>שמות מתחם</strong> קריאים לאדם (כמו www.example.com) ל<strong>כתובות IP</strong> (כמו 93.184.216.34). מכונה לעתים קרובות 'ספר הטלפונים של האינטרנט'.",
        relatedTerms: ["IP Address", "FQDN", "DNSSEC"],
        visualization: {
            type: "dns-lookup",
            data: { domain: "www.example.com", ip: "93.184.216.34", ttl: "3600s" }
        }
    },
    // === E ===
    {
        term: "Ethernet",
        fullName: "IEEE 802.3 Standard",
        category: "Protocol",
        layer: "Layer 1/2",
        definitionEn: "A family of wired computer networking technologies commonly used in <strong>Local Area Networks (LAN)</strong>. It defines the physical layer specifications and data link layer protocols for frame format and media access control (MAC). Speeds range from 10 Mbps to 400 Gbps.",
        definitionHe: "Ethernet הוא משפחה של טכנולוגיות רשתות מחשבים חוטיות הנפוצות ב<strong>רשתות מקומיות (LAN)</strong>. הוא מגדיר מפרטי שכבה פיזית ופרוטוקולי שכבת קישור הנתונים עבור פורמט מסגרת ובקרת גישה למדיה (MAC).",
        relatedTerms: ["MAC Address", "Switch", "IEEE 802.3"],
        visualization: {
            type: "ethernet-frame",
            fields: ["Preamble", "Dest MAC", "Src MAC", "Type", "Payload", "FCS"]
        }
    },
    {
        term: "Encapsulation",
        fullName: "Data Encapsulation",
        category: "General",
        layer: "",
        definitionEn: "The process of wrapping data with protocol information at each layer of the <strong>OSI model</strong> before network transmission. Each layer adds its own header (and sometimes trailer) to the data from the layer above.",
        definitionHe: "תהליך עטיפת נתונים במידע פרוטוקול בכל שכבה של <strong>מודל OSI</strong> לפני שידור ברשת. כל שכבה מוסיפה כותרת משלה (ולפעמים סיומת) לנתונים מהשכבה שמעלה.",
        relatedTerms: ["OSI Model", "PDU", "Decapsulation"],
        visualization: null
    },
    // === F ===
    {
        term: "Firewall",
        fullName: "Network Firewall",
        category: "Security",
        layer: "Layer 3-7",
        definitionEn: "A network security device or software that monitors and controls incoming and outgoing network traffic based on predetermined <strong>security rules</strong>. It establishes a barrier between trusted internal networks and untrusted external networks like the Internet.",
        definitionHe: "חומת אש היא התקן או תוכנת אבטחת רשת שמנטרת ומבקרת תעבורת רשת נכנסת ויוצאת בהתבסס על <strong>כללי אבטחה</strong> קבועים מראש. היא מקימה מחסום בין רשתות פנימיות מהימנות לרשתות חיצוניות שאינן מהימנות כמו האינטרנט.",
        relatedTerms: ["ACL", "IDS", "NAT"],
        visualization: null
    },
    {
        term: "FTP",
        fullName: "File Transfer Protocol",
        category: "Protocol",
        layer: "Layer 7",
        definitionEn: "A standard communication protocol used for the transfer of files between a client and server on a computer network. FTP uses <strong>TCP port 21</strong> for control and <strong>port 20</strong> for data transfer.",
        definitionHe: "FTP הוא פרוטוקול תקשורת סטנדרטי המשמש להעברת קבצים בין לקוח לשרת ברשת מחשבים. FTP משתמש ב<strong>פורט TCP 21</strong> לבקרה וב<strong>פורט 20</strong> להעברת נתונים.",
        relatedTerms: ["SFTP", "TFTP", "SCP"],
        visualization: null
    },
    // === G ===
    {
        term: "Gateway",
        fullName: "Default Gateway",
        category: "Hardware",
        layer: "Layer 3",
        definitionEn: "A network node that serves as an access point to another network. The <strong>default gateway</strong> is typically the router's IP address on the local network and is the first hop for traffic destined for other networks.",
        definitionHe: "שער (Gateway) הוא צומת רשת המשמש כנקודת גישה לרשת אחרת. <strong>שער ברירת המחדל</strong> הוא בדרך כלל כתובת ה-IP של הנתב ברשת המקומית והוא הקפיצה הראשונה עבור תעבורה המיועדת לרשתות אחרות.",
        relatedTerms: ["Router", "Routing Table", "NAT"],
        visualization: null
    },
    // === H ===
    {
        term: "HTTP",
        fullName: "HyperText Transfer Protocol",
        category: "Protocol",
        layer: "Layer 7",
        definitionEn: "An application-layer protocol for transmitting hypermedia documents, such as HTML. It follows a <strong>client-server model</strong> where the browser (client) sends requests and the web server returns responses. Uses <strong>TCP port 80</strong>.",
        definitionHe: "HTTP הוא פרוטוקול שכבת יישום להעברת מסמכי היפרמדיה כמו HTML. הוא פועל לפי <strong>מודל לקוח-שרת</strong> בו הדפדפן (לקוח) שולח בקשות ושרת האינטרנט מחזיר תגובות. משתמש ב<strong>פורט TCP 80</strong>.",
        relatedTerms: ["HTTPS", "TCP", "REST API"],
        visualization: {
            type: "http-request",
            data: { method: "GET", path: "/index.html", status: "200 OK", contentType: "text/html" }
        }
    },
    {
        term: "HTTPS",
        fullName: "HyperText Transfer Protocol Secure",
        category: "Security",
        layer: "Layer 7",
        definitionEn: "An extension of HTTP that uses <strong>TLS/SSL</strong> encryption to secure communication between client and server. It ensures data integrity, confidentiality, and authentication. Uses <strong>TCP port 443</strong>.",
        definitionHe: "HTTPS הוא הרחבה של HTTP שמשתמשת בהצפנת <strong>TLS/SSL</strong> לאבטחת התקשורת בין לקוח לשרת. הוא מבטיח שלמות נתונים, סודיות ואימות. משתמש ב<strong>פורט TCP 443</strong>.",
        relatedTerms: ["HTTP", "TLS", "SSL"],
        visualization: null
    },
    {
        term: "Hub",
        fullName: "Network Hub",
        category: "Hardware",
        layer: "Layer 1",
        definitionEn: "A basic networking device that connects multiple devices in a LAN. Unlike a switch, a hub <strong>broadcasts</strong> all incoming data to every connected port, creating a single collision domain. Largely replaced by switches in modern networks.",
        definitionHe: "רכזת (Hub) היא התקן רשת בסיסי המחבר מספר מכשירים ברשת מקומית. שלא כמו מתג, רכזת <strong>משדרת</strong> את כל הנתונים הנכנסים לכל פורט מחובר, ויוצרת דומיין התנגשות יחיד. הוחלפה ברובה על ידי מתגים.",
        relatedTerms: ["Switch", "Bridge", "Collision Domain"],
        visualization: null
    },
    // === I ===
    {
        term: "ICMP",
        fullName: "Internet Control Message Protocol",
        category: "Protocol",
        layer: "Layer 3",
        definitionEn: "A supporting protocol in the Internet Protocol Suite used by network devices to send <strong>error messages</strong> and operational information. The <strong>ping</strong> and <strong>traceroute</strong> commands use ICMP to diagnose network connectivity issues.",
        definitionHe: "ICMP הוא פרוטוקול תומך בחבילת פרוטוקולי האינטרנט המשמש התקני רשת לשליחת <strong>הודעות שגיאה</strong> ומידע תפעולי. פקודות <strong>ping</strong> ו-<strong>traceroute</strong> משתמשות ב-ICMP לאבחון בעיות קישוריות.",
        relatedTerms: ["Ping", "Traceroute", "IP"],
        visualization: {
            type: "ping",
            data: [
                { seq: 1, ttl: 64, time: "12ms" },
                { seq: 2, ttl: 64, time: "11ms" },
                { seq: 3, ttl: 64, time: "13ms" }
            ]
        }
    },
    {
        term: "IP Address",
        fullName: "Internet Protocol Address",
        category: "Addressing",
        layer: "Layer 3",
        definitionEn: "A numerical label assigned to each device connected to a network that uses the Internet Protocol. <strong>IPv4</strong> uses 32-bit addresses (e.g., 192.168.1.1) while <strong>IPv6</strong> uses 128-bit addresses (e.g., 2001:db8::1).",
        definitionHe: "כתובת IP היא תווית מספרית המוקצית לכל התקן המחובר לרשת המשתמשת בפרוטוקול האינטרנט. <strong>IPv4</strong> משתמש בכתובות של 32 סיביות (למשל 192.168.1.1) בעוד <strong>IPv6</strong> משתמש ב-128 סיביות.",
        relatedTerms: ["Subnet Mask", "CIDR", "NAT"],
        visualization: {
            type: "ip-breakdown",
            data: { address: "192.168.1.100", mask: "/24", network: "192.168.1.0", broadcast: "192.168.1.255" }
        }
    },
    {
        term: "IDS",
        fullName: "Intrusion Detection System",
        category: "Security",
        layer: "Layer 3-7",
        definitionEn: "A device or software application that monitors a network for <strong>malicious activity</strong> or policy violations. An IDS can be network-based (NIDS) or host-based (HIDS). Unlike an IPS, it typically only alerts rather than blocking threats.",
        definitionHe: "מערכת גילוי חדירות (IDS) היא התקן או יישום תוכנה שמנטר רשת לאיתור <strong>פעילות זדונית</strong> או הפרות מדיניות. IDS יכול להיות מבוסס רשת (NIDS) או מבוסס מארח (HIDS).",
        relatedTerms: ["IPS", "Firewall", "SIEM"],
        visualization: null
    },
    // === L ===
    {
        term: "LAN",
        fullName: "Local Area Network",
        category: "General",
        layer: "",
        definitionEn: "A computer network that interconnects computers within a <strong>limited geographical area</strong> such as a home, school, or office building. LANs typically use Ethernet or WiFi technologies and offer high data transfer rates.",
        definitionHe: "רשת מקומית (LAN) היא רשת מחשבים המחברת מחשבים בתוך <strong>שטח גאוגרפי מוגבל</strong> כמו בית, בית ספר או בניין משרדים. רשתות LAN משתמשות בדרך כלל בטכנולוגיות Ethernet או WiFi.",
        relatedTerms: ["WAN", "VLAN", "Ethernet"],
        visualization: null
    },
    {
        term: "Latency",
        fullName: "Network Latency",
        category: "General",
        layer: "",
        definitionEn: "The time delay between the cause and the effect of some physical change in a network. In networking, it's the time it takes for a <strong>data packet</strong> to travel from source to destination. Measured in <strong>milliseconds (ms)</strong>.",
        definitionHe: "זמן השהיה (Latency) הוא עיכוב הזמן בין הגורם לתוצאה של שינוי פיזי כלשהו ברשת. בתקשורת, זהו הזמן שלוקח ל<strong>חבילת נתונים</strong> לנסוע ממקור ליעד. נמדד ב<strong>אלפיות שנייה (ms)</strong>.",
        relatedTerms: ["Bandwidth", "Jitter", "Ping"],
        visualization: null
    },
    // === M ===
    {
        term: "MAC Address",
        fullName: "Media Access Control Address",
        category: "Addressing",
        layer: "Layer 2",
        definitionEn: "A unique identifier assigned to a network interface controller (NIC) for use as a network address. A MAC address is a <strong>48-bit</strong> address (e.g., 00:1A:2B:3C:4D:5E) burned into hardware and used for local network communication.",
        definitionHe: "כתובת MAC היא מזהה ייחודי המוקצה לבקר ממשק רשת (NIC) לשימוש ככתובת רשת. כתובת MAC היא כתובת של <strong>48 סיביות</strong> (למשל 00:1A:2B:3C:4D:5E) שצרובה בחומרה ומשמשת לתקשורת ברשת מקומית.",
        relatedTerms: ["ARP", "IP Address", "NIC"],
        visualization: {
            type: "mac-format",
            data: { mac: "00:1A:2B:3C:4D:5E", oui: "00:1A:2B", device: "3C:4D:5E" }
        }
    },
    // === N ===
    {
        term: "NAT",
        fullName: "Network Address Translation",
        category: "Protocol",
        layer: "Layer 3",
        definitionEn: "A method of mapping one IP address space into another by modifying network address information in the IP header of packets while in transit. NAT enables <strong>multiple devices</strong> on a private network to access the Internet using a single public IP address.",
        definitionHe: "NAT הוא שיטה למיפוי מרחב כתובות IP אחד לאחר על ידי שינוי מידע כתובת הרשת בכותרת ה-IP של חבילות במעבר. NAT מאפשר ל<strong>מכשירים מרובים</strong> ברשת פרטית לגשת לאינטרנט באמצעות כתובת IP ציבורית אחת.",
        relatedTerms: ["IP Address", "PAT", "Firewall"],
        visualization: {
            type: "nat-table",
            data: [
                { internal: "192.168.1.10:5000", external: "203.0.113.5:40001" },
                { internal: "192.168.1.11:5001", external: "203.0.113.5:40002" }
            ]
        }
    },
    {
        term: "NIC",
        fullName: "Network Interface Card",
        category: "Hardware",
        layer: "Layer 1/2",
        definitionEn: "A hardware component that connects a computer to a network. Each NIC has a unique <strong>MAC address</strong> and is responsible for converting data into electrical or optical signals for transmission over the network medium.",
        definitionHe: "כרטיס ממשק רשת (NIC) הוא רכיב חומרה המחבר מחשב לרשת. לכל NIC יש <strong>כתובת MAC</strong> ייחודית והוא אחראי על המרת נתונים לאותות חשמליים או אופטיים לשידור דרך אמצעי הרשת.",
        relatedTerms: ["MAC Address", "Ethernet", "Driver"],
        visualization: null
    },
    // === O ===
    {
        term: "OSI Model",
        fullName: "Open Systems Interconnection Model",
        category: "Model",
        layer: "",
        definitionEn: "A conceptual framework that standardizes the functions of a telecommunication system into <strong>seven abstraction layers</strong>: Physical, Data Link, Network, Transport, Session, Presentation, and Application. It helps understand how data moves through a network.",
        definitionHe: "מודל OSI הוא מסגרת מושגית שמתקנת את פונקציות מערכת תקשורת ל<strong>שבע שכבות הפשטה</strong>: פיזית, קישור נתונים, רשת, תעבורה, שיחה, מצג ויישום. הוא מסייע להבין כיצד נתונים נעים דרך רשת.",
        relatedTerms: ["TCP/IP Model", "Encapsulation", "PDU"],
        visualization: {
            type: "osi-layers",
            data: [
                { num: 7, name: "Application", pdu: "Data", color: "#ef4444" },
                { num: 6, name: "Presentation", pdu: "Data", color: "#f97316" },
                { num: 5, name: "Session", pdu: "Data", color: "#eab308" },
                { num: 4, name: "Transport", pdu: "Segment", color: "#22c55e" },
                { num: 3, name: "Network", pdu: "Packet", color: "#3b82f6" },
                { num: 2, name: "Data Link", pdu: "Frame", color: "#8b5cf6" },
                { num: 1, name: "Physical", pdu: "Bits", color: "#14b8a6" }
            ]
        }
    },
    {
        term: "OSPF",
        fullName: "Open Shortest Path First",
        category: "Protocol",
        layer: "Layer 3",
        definitionEn: "A link-state routing protocol that uses <strong>Dijkstra's algorithm</strong> to find the shortest path to every node in the network. OSPF operates within a single Autonomous System and divides the network into areas for scalability.",
        definitionHe: "OSPF הוא פרוטוקול ניתוב מצב קישור שמשתמש ב<strong>אלגוריתם דייקסטרה</strong> למציאת הנתיב הקצר ביותר לכל צומת ברשת. OSPF פועל בתוך מערכת אוטונומית יחידה ומחלק את הרשת לאזורים.",
        relatedTerms: ["BGP", "RIP", "Routing Table"],
        visualization: null
    },
    // === P ===
    {
        term: "Ping",
        fullName: "Packet Internet Groper",
        category: "General",
        layer: "Layer 3",
        definitionEn: "A network utility used to test the <strong>reachability</strong> of a host on an IP network. It works by sending <strong>ICMP Echo Request</strong> packets and measuring the time for ICMP Echo Reply. Essential for basic network troubleshooting.",
        definitionHe: "Ping הוא כלי רשת המשמש לבדיקת <strong>נגישות</strong> מארח ברשת IP. הוא פועל על ידי שליחת חבילות <strong>ICMP Echo Request</strong> ומדידת הזמן לקבלת ICMP Echo Reply. חיוני לאבחון רשת בסיסי.",
        relatedTerms: ["ICMP", "Traceroute", "Latency"],
        visualization: {
            type: "ping",
            data: [
                { seq: 1, ttl: 64, time: "12ms" },
                { seq: 2, ttl: 64, time: "11ms" },
                { seq: 3, ttl: 64, time: "13ms" }
            ]
        }
    },
    {
        term: "Port",
        fullName: "Network Port",
        category: "General",
        layer: "Layer 4",
        definitionEn: "A logical endpoint for communication in a network. Ports are identified by <strong>16-bit numbers</strong> (0–65535). Well-known ports include: HTTP (80), HTTPS (443), SSH (22), DNS (53), FTP (21). Ports allow multiple services on one IP address.",
        definitionHe: "פורט הוא נקודת קצה לוגית לתקשורת ברשת. פורטים מזוהים על ידי <strong>מספרים של 16 סיביות</strong> (0-65535). פורטים ידועים כוללים: HTTP (80), HTTPS (443), SSH (22), DNS (53), FTP (21).",
        relatedTerms: ["TCP", "UDP", "Socket"],
        visualization: {
            type: "port-list",
            data: [
                { port: 21, service: "FTP", protocol: "TCP" },
                { port: 22, service: "SSH", protocol: "TCP" },
                { port: 53, service: "DNS", protocol: "TCP/UDP" },
                { port: 80, service: "HTTP", protocol: "TCP" },
                { port: 443, service: "HTTPS", protocol: "TCP" }
            ]
        }
    },
    // === Q ===
    {
        term: "QoS",
        fullName: "Quality of Service",
        category: "General",
        layer: "Layer 2-4",
        definitionEn: "A set of technologies that manage network resources by <strong>prioritizing</strong> certain types of traffic. QoS ensures that critical applications (like VoIP or video) receive adequate bandwidth, low latency, and low packet loss.",
        definitionHe: "QoS הוא סט טכנולוגיות לניהול משאבי רשת על ידי <strong>תיעדוף</strong> סוגים מסוימים של תעבורה. QoS מבטיח שיישומים קריטיים (כמו VoIP או וידאו) יקבלו רוחב פס מספק, זמן השהיה נמוך ואובדן חבילות נמוך.",
        relatedTerms: ["Bandwidth", "Latency", "VoIP"],
        visualization: null
    },
    // === R ===
    {
        term: "Router",
        fullName: "Network Router",
        category: "Hardware",
        layer: "Layer 3",
        definitionEn: "A networking device that forwards data packets between computer networks. Routers perform traffic directing functions using <strong>routing tables</strong> and protocols. They operate at Layer 3 and make forwarding decisions based on IP addresses.",
        definitionHe: "נתב הוא התקן רשת שמעביר חבילות נתונים בין רשתות מחשבים. נתבים מבצעים פונקציות הפניית תעבורה באמצעות <strong>טבלאות ניתוב</strong> ופרוטוקולים. הם פועלים בשכבה 3 ומקבלים החלטות העברה על סמך כתובות IP.",
        relatedTerms: ["Switch", "Gateway", "Routing Table"],
        visualization: null
    },
    {
        term: "RIP",
        fullName: "Routing Information Protocol",
        category: "Protocol",
        layer: "Layer 3",
        definitionEn: "One of the oldest distance-vector routing protocols that uses <strong>hop count</strong> as a routing metric. RIP has a maximum of 15 hops, making it suitable only for small networks. It has been largely replaced by OSPF and EIGRP.",
        definitionHe: "RIP הוא אחד מפרוטוקולי ניתוב וקטור-מרחק הוותיקים ביותר שמשתמש ב<strong>ספירת קפיצות</strong> כמדד ניתוב. ל-RIP מגבלה של 15 קפיצות, מה שהופך אותו מתאים רק לרשתות קטנות.",
        relatedTerms: ["OSPF", "BGP", "EIGRP"],
        visualization: null
    },
    // === S ===
    {
        term: "SSH",
        fullName: "Secure Shell",
        category: "Security",
        layer: "Layer 7",
        definitionEn: "A cryptographic network protocol for operating network services securely over an unsecured network. SSH provides a secure channel through <strong>encrypted communication</strong>. Uses <strong>TCP port 22</strong>. Commonly used for remote server management.",
        definitionHe: "SSH הוא פרוטוקול רשת הצפנתי להפעלת שירותי רשת באופן מאובטח על רשת לא מאובטחת. SSH מספק ערוץ מאובטח באמצעות <strong>תקשורת מוצפנת</strong>. משתמש ב<strong>פורט TCP 22</strong>.",
        relatedTerms: ["Telnet", "SSL", "TLS"],
        visualization: null
    },
    {
        term: "Subnet Mask",
        fullName: "Subnet Mask",
        category: "Addressing",
        layer: "Layer 3",
        definitionEn: "A 32-bit number that <strong>divides an IP address</strong> into network and host portions. For example, 255.255.255.0 (/24) means the first 24 bits identify the network and the remaining 8 bits identify hosts on that network.",
        definitionHe: "מסכת רשת משנה היא מספר של 32 סיביות ש<strong>מחלקת כתובת IP</strong> לחלקי רשת ומארח. לדוגמה, 255.255.255.0 (/24) משמעותו ש-24 הסיביות הראשונות מזהות את הרשת ו-8 הסיביות הנותרות מזהות מארחים.",
        relatedTerms: ["CIDR", "IP Address", "VLSM"],
        visualization: {
            type: "subnet-visual",
            data: { mask: "255.255.255.0", binary: "11111111.11111111.11111111.00000000", prefix: "/24" }
        }
    },
    {
        term: "Switch",
        fullName: "Network Switch",
        category: "Hardware",
        layer: "Layer 2",
        definitionEn: "A networking device that connects devices on a network by using <strong>MAC addresses</strong> to forward data to the correct destination. Unlike a hub, a switch creates individual collision domains per port and operates at Layer 2.",
        definitionHe: "מתג (Switch) הוא התקן רשת המחבר מכשירים ברשת באמצעות <strong>כתובות MAC</strong> להעברת נתונים ליעד הנכון. שלא כמו רכזת, מתג יוצר דומייני התנגשות פרטניים לכל פורט ופועל בשכבה 2.",
        relatedTerms: ["Hub", "Router", "VLAN"],
        visualization: null
    },
    {
        term: "STP",
        fullName: "Spanning Tree Protocol",
        category: "Protocol",
        layer: "Layer 2",
        definitionEn: "A network protocol that builds a <strong>loop-free logical topology</strong> for Ethernet networks. STP prevents bridge loops by creating a spanning tree from the network graph, disabling redundant links while keeping backup paths available.",
        definitionHe: "STP הוא פרוטוקול רשת שבונה <strong>טופולוגיה לוגית ללא לולאות</strong> עבור רשתות Ethernet. STP מונע לולאות גשר על ידי יצירת עץ פורש מגרף הרשת, השבתת קישורים מיותרים תוך שמירת נתיבי גיבוי.",
        relatedTerms: ["Switch", "VLAN", "Bridge"],
        visualization: null
    },
    // === T ===
    {
        term: "TCP",
        fullName: "Transmission Control Protocol",
        category: "Protocol",
        layer: "Layer 4",
        definitionEn: "A connection-oriented transport protocol that provides <strong>reliable, ordered, and error-checked</strong> delivery of data between applications. TCP uses a <strong>three-way handshake</strong> (SYN, SYN-ACK, ACK) to establish connections.",
        definitionHe: "TCP הוא פרוטוקול תעבורה מוכוון-חיבור שמספק מסירת נתונים <strong>אמינה, מסודרת ומאומתת שגיאות</strong> בין יישומים. TCP משתמש ב<strong>לחיצת יד תלת-כיוונית</strong> (SYN, SYN-ACK, ACK) ליצירת חיבורים.",
        relatedTerms: ["UDP", "IP", "Three-Way Handshake"],
        visualization: {
            type: "tcp-handshake",
            steps: [
                { from: "Client", to: "Server", label: "SYN", color: "#3b82f6" },
                { from: "Server", to: "Client", label: "SYN-ACK", color: "#22c55e" },
                { from: "Client", to: "Server", label: "ACK", color: "#8b5cf6" }
            ]
        }
    },
    {
        term: "TCP/IP Model",
        fullName: "Internet Protocol Suite",
        category: "Model",
        layer: "",
        definitionEn: "The foundational communication model of the Internet, consisting of <strong>four layers</strong>: Network Access, Internet, Transport, and Application. Also known as the Internet Protocol Suite, it provides end-to-end data communication.",
        definitionHe: "מודל TCP/IP הוא מודל התקשורת הבסיסי של האינטרנט, המורכב מ<strong>ארבע שכבות</strong>: גישה לרשת, אינטרנט, תעבורה ויישום. מודל זה מספק תקשורת נתונים מקצה לקצה.",
        relatedTerms: ["OSI Model", "TCP", "IP"],
        visualization: {
            type: "tcpip-model",
            data: [
                { num: 4, name: "Application", examples: "HTTP, FTP, DNS", color: "#ef4444" },
                { num: 3, name: "Transport", examples: "TCP, UDP", color: "#22c55e" },
                { num: 2, name: "Internet", examples: "IP, ICMP, ARP", color: "#3b82f6" },
                { num: 1, name: "Network Access", examples: "Ethernet, WiFi", color: "#8b5cf6" }
            ]
        }
    },
    {
        term: "TLS",
        fullName: "Transport Layer Security",
        category: "Security",
        layer: "Layer 5/6",
        definitionEn: "A cryptographic protocol designed to provide <strong>communications security</strong> over a computer network. TLS is the successor to SSL and is used to encrypt connections between web browsers and servers (HTTPS), email, and other applications.",
        definitionHe: "TLS הוא פרוטוקול הצפנה שנועד לספק <strong>אבטחת תקשורת</strong> על רשת מחשבים. TLS הוא הממשיך של SSL ומשמש להצפנת חיבורים בין דפדפני אינטרנט לשרתים (HTTPS), דוא\"ל ויישומים אחרים.",
        relatedTerms: ["SSL", "HTTPS", "Certificate"],
        visualization: null
    },
    {
        term: "Traceroute",
        fullName: "Traceroute / Tracert",
        category: "General",
        layer: "Layer 3",
        definitionEn: "A network diagnostic tool that displays the <strong>route (path)</strong> and measures transit delays of packets across a network. It uses ICMP or UDP packets with incrementing <strong>TTL</strong> values to discover each hop along the path.",
        definitionHe: "Traceroute הוא כלי אבחון רשת שמציג את <strong>המסלול (נתיב)</strong> ומודד עיכובי מעבר של חבילות ברשת. הוא משתמש בחבילות ICMP או UDP עם ערכי <strong>TTL</strong> עולים לגילוי כל קפיצה לאורך הנתיב.",
        relatedTerms: ["Ping", "ICMP", "TTL"],
        visualization: {
            type: "traceroute",
            data: [
                { hop: 1, ip: "192.168.1.1", ms: "1ms", label: "Router" },
                { hop: 2, ip: "10.0.0.1", ms: "5ms", label: "ISP" },
                { hop: 3, ip: "72.14.233.1", ms: "12ms", label: "Google" }
            ]
        }
    },
    // === U ===
    {
        term: "UDP",
        fullName: "User Datagram Protocol",
        category: "Protocol",
        layer: "Layer 4",
        definitionEn: "A connectionless transport protocol that provides a <strong>fast but unreliable</strong> data delivery service. UDP does not establish connections or guarantee delivery. Used for time-sensitive applications like <strong>video streaming, gaming, and VoIP</strong>.",
        definitionHe: "UDP הוא פרוטוקול תעבורה חסר חיבור שמספק שירות מסירת נתונים <strong>מהיר אך לא אמין</strong>. UDP לא מקים חיבורים ולא מבטיח מסירה. משמש ליישומים רגישים לזמן כמו <strong>הזרמת וידאו, משחקים ו-VoIP</strong>.",
        relatedTerms: ["TCP", "Port", "VoIP"],
        visualization: null
    },
    // === V ===
    {
        term: "VLAN",
        fullName: "Virtual Local Area Network",
        category: "General",
        layer: "Layer 2",
        definitionEn: "A logical subdivision of a network at Layer 2 that groups devices together regardless of their <strong>physical location</strong>. VLANs improve security and reduce broadcast traffic by creating isolated broadcast domains within a switch.",
        definitionHe: "VLAN הוא חלוקת משנה לוגית של רשת בשכבה 2 שמקבצת התקנים יחד ללא קשר ל<strong>מיקומם הפיזי</strong>. VLAN משפר אבטחה ומצמצם תעבורת שידור על ידי יצירת דומייני שידור מבודדים בתוך מתג.",
        relatedTerms: ["Switch", "Trunking", "802.1Q"],
        visualization: null
    },
    {
        term: "VPN",
        fullName: "Virtual Private Network",
        category: "Security",
        layer: "Layer 3",
        definitionEn: "A technology that creates a <strong>secure, encrypted tunnel</strong> over a public network (like the Internet) to connect remote users or sites to a private network. Common VPN protocols include IPSec, OpenVPN, and WireGuard.",
        definitionHe: "VPN הוא טכנולוגיה שיוצרת <strong>מנהרה מאובטחת ומוצפנת</strong> על רשת ציבורית (כמו האינטרנט) לחיבור משתמשים או אתרים מרוחקים לרשת פרטית. פרוטוקולי VPN נפוצים כוללים IPSec, OpenVPN ו-WireGuard.",
        relatedTerms: ["IPSec", "TLS", "Tunneling"],
        visualization: null
    },
    // === W ===
    {
        term: "WAN",
        fullName: "Wide Area Network",
        category: "General",
        layer: "",
        definitionEn: "A telecommunications network that extends over a <strong>large geographical area</strong>, often connecting multiple LANs. The Internet is the largest WAN. Technologies include MPLS, leased lines, and broadband connections.",
        definitionHe: "רשת רחבת שטח (WAN) היא רשת תקשורת המשתרעת על <strong>שטח גאוגרפי גדול</strong>, לעתים קרובות מחברת מספר רשתות LAN. האינטרנט הוא ה-WAN הגדול ביותר.",
        relatedTerms: ["LAN", "MAN", "MPLS"],
        visualization: null
    },
    {
        term: "WiFi",
        fullName: "IEEE 802.11 Wireless Standard",
        category: "Protocol",
        layer: "Layer 1/2",
        definitionEn: "A family of wireless networking protocols based on the <strong>IEEE 802.11</strong> standards. WiFi uses <strong>radio waves</strong> at 2.4 GHz, 5 GHz, and 6 GHz frequencies to provide high-speed wireless network connections.",
        definitionHe: "WiFi הוא משפחה של פרוטוקולי רשת אלחוטית המבוססים על תקני <strong>IEEE 802.11</strong>. WiFi משתמש ב<strong>גלי רדיו</strong> בתדרי 2.4 GHz, 5 GHz ו-6 GHz לספק חיבורי רשת אלחוטית במהירות גבוהה.",
        relatedTerms: ["Ethernet", "SSID", "WPA"],
        visualization: null
    },
    // === X ===
    {
        term: "XSS",
        fullName: "Cross-Site Scripting",
        category: "Security",
        layer: "Layer 7",
        definitionEn: "A type of security vulnerability typically found in web applications. XSS enables attackers to <strong>inject malicious scripts</strong> into web pages viewed by other users. Types include Stored, Reflected, and DOM-based XSS.",
        definitionHe: "XSS הוא סוג של פרצת אבטחה הנמצאת בדרך כלל ביישומי אינטרנט. XSS מאפשר לתוקפים <strong>להזריק סקריפטים זדוניים</strong> לדפי אינטרנט הנצפים על ידי משתמשים אחרים.",
        relatedTerms: ["CSRF", "SQL Injection", "WAF"],
        visualization: null
    },
    // === Z ===
    {
        term: "Zero Trust",
        fullName: "Zero Trust Architecture",
        category: "Security",
        layer: "",
        definitionEn: "A security framework requiring all users — inside or outside the organization — to be <strong>authenticated, authorized, and continuously validated</strong> before being granted access to applications and data. Its core principle: 'Never trust, always verify.'",
        definitionHe: "Zero Trust הוא מסגרת אבטחה הדורשת מכל המשתמשים — בתוך הארגון או מחוצה לו — להיות <strong>מאומתים, מורשים ומאומתים באופן מתמיד</strong> לפני קבלת גישה ליישומים ונתונים. עקרון הליבה: 'לעולם אל תסמוך, תמיד אמת'.",
        relatedTerms: ["VPN", "MFA", "IAM"],
        visualization: null
    },
    // Extra terms for richness
    {
        term: "APIPA",
        fullName: "Automatic Private IP Addressing",
        category: "Addressing",
        layer: "Layer 3",
        definitionEn: "A feature in operating systems where a device <strong>automatically assigns itself</strong> an IP address from the 169.254.x.x range when no DHCP server is available. Used as a fallback mechanism for local network communication.",
        definitionHe: "APIPA הוא תכונה במערכות הפעלה שבה מכשיר <strong>מקצה לעצמו אוטומטית</strong> כתובת IP מהטווח 169.254.x.x כאשר אין שרת DHCP זמין. משמש כמנגנון חלופי לתקשורת ברשת מקומית.",
        relatedTerms: ["DHCP", "IP Address", "Link-Local"],
        visualization: null
    },
    {
        term: "SNMP",
        fullName: "Simple Network Management Protocol",
        category: "Protocol",
        layer: "Layer 7",
        definitionEn: "An Internet Standard protocol for collecting and organizing information about managed devices on IP networks. SNMP uses <strong>agents</strong> on monitored devices and a <strong>manager</strong> station to collect data like bandwidth usage and uptime.",
        definitionHe: "SNMP הוא פרוטוקול תקני אינטרנט לאיסוף וארגון מידע על התקנים מנוהלים ברשתות IP. SNMP משתמש ב<strong>סוכנים</strong> על מכשירים מנוטרים ו<strong>תחנת מנהל</strong> לאיסוף נתונים.",
        relatedTerms: ["MIB", "OID", "Syslog"],
        visualization: null
    },
    {
        term: "VRRP",
        fullName: "Virtual Router Redundancy Protocol",
        category: "Protocol",
        layer: "Layer 3",
        definitionEn: "A protocol that provides automatic assignment of available <strong>Internet Protocol routers</strong> to participating hosts. This increases the availability and reliability of routing paths via automatic default gateway selections.",
        definitionHe: "VRRP הוא פרוטוקול המספק הקצאה אוטומטית של <strong>נתבי פרוטוקול אינטרנט</strong> זמינים למארחים משתתפים. פרוטוקול זה מגביר את הזמינות והאמינות של נתיבי ניתוב.",
        relatedTerms: ["HSRP", "Gateway", "Redundancy"],
        visualization: null
    },
    {
        term: "MPLS",
        fullName: "Multiprotocol Label Switching",
        category: "Protocol",
        layer: "Layer 2.5",
        definitionEn: "A routing technique that directs data based on <strong>short path labels</strong> rather than long network addresses. MPLS increases speed and controls traffic flow in telecommunication networks, operating between Layer 2 and Layer 3.",
        definitionHe: "MPLS הוא טכניקת ניתוב שמפנה נתונים על סמך <strong>תוויות נתיב קצרות</strong> ולא כתובות רשת ארוכות. MPLS מגביר מהירות ושולט בזרימת תעבורה ברשתות תקשורת.",
        relatedTerms: ["WAN", "VPN", "QoS"],
        visualization: null
    },
    {
        term: "EIGRP",
        fullName: "Enhanced Interior Gateway Routing Protocol",
        category: "Protocol",
        layer: "Layer 3",
        definitionEn: "An advanced distance-vector routing protocol developed by Cisco. EIGRP uses <strong>DUAL algorithm</strong> for fast convergence and supports unequal-cost load balancing. Originally proprietary, now an open standard (RFC 7868).",
        definitionHe: "EIGRP הוא פרוטוקול ניתוב וקטור-מרחק מתקדם שפותח על ידי Cisco. EIGRP משתמש ב<strong>אלגוריתם DUAL</strong> להתכנסות מהירה ותומך באיזון עומסים לא שווה.",
        relatedTerms: ["OSPF", "RIP", "BGP"],
        visualization: null
    },
    {
        term: "RARP",
        fullName: "Reverse Address Resolution Protocol",
        category: "Protocol",
        layer: "Layer 2/3",
        definitionEn: "An obsolete protocol used to find the <strong>IP address</strong> of a device when only its <strong>MAC address</strong> is known — the reverse of ARP. Superseded by BOOTP and DHCP in modern networks.",
        definitionHe: "RARP הוא פרוטוקול מיושן ששימש למציאת <strong>כתובת IP</strong> של מכשיר כאשר רק <strong>כתובת ה-MAC</strong> שלו ידועה — ההפך מ-ARP. הוחלף על ידי BOOTP ו-DHCP.",
        relatedTerms: ["ARP", "DHCP", "BOOTP"],
        visualization: null
    },
    {
        term: "Jitter",
        fullName: "Network Jitter",
        category: "General",
        layer: "",
        definitionEn: "The variation in delay of received packets. In a network, <strong>jitter</strong> is the inconsistency in arrival time of packets, which can cause audio/video degradation in real-time applications like VoIP and video conferencing.",
        definitionHe: "Jitter הוא השונות בעיכוב של חבילות שהתקבלו. ברשת, <strong>jitter</strong> הוא חוסר העקביות בזמן ההגעה של חבילות, שיכול לגרום לפגיעה באיכות שמע/וידאו ביישומי זמן אמת.",
        relatedTerms: ["Latency", "QoS", "VoIP"],
        visualization: null
    },
    {
        term: "IPSec",
        fullName: "Internet Protocol Security",
        category: "Security",
        layer: "Layer 3",
        definitionEn: "A suite of protocols that provides security for Internet Protocol communications by <strong>authenticating and encrypting</strong> each IP packet in a communication session. IPSec includes AH (Authentication Header) and ESP (Encapsulating Security Payload).",
        definitionHe: "IPSec הוא חבילת פרוטוקולים שמספקת אבטחה לתקשורת פרוטוקול אינטרנט על ידי <strong>אימות והצפנה</strong> של כל חבילת IP בסשן תקשורת.",
        relatedTerms: ["VPN", "TLS", "Encryption"],
        visualization: null
    },
    {
        term: "Telnet",
        fullName: "Teletype Network Protocol",
        category: "Protocol",
        layer: "Layer 7",
        definitionEn: "An application layer protocol that provides a <strong>bidirectional text-based communication</strong> facility using a virtual terminal connection. Uses TCP port 23. Considered insecure as data is transmitted in plaintext — largely replaced by SSH.",
        definitionHe: "Telnet הוא פרוטוקול שכבת יישום שמספק מתקן <strong>תקשורת טקסטואלית דו-כיוונית</strong> באמצעות חיבור טרמינל וירטואלי. משתמש בפורט TCP 23. נחשב לא מאובטח — הוחלף בעיקר על ידי SSH.",
        relatedTerms: ["SSH", "CLI", "Remote Access"],
        visualization: null
    },
    {
        term: "TTL",
        fullName: "Time To Live",
        category: "General",
        layer: "Layer 3",
        definitionEn: "A field in IP packet headers that limits the <strong>lifespan of data</strong> in the network. Each router that processes the packet decrements the TTL by 1. When TTL reaches 0, the packet is discarded — preventing infinite routing loops.",
        definitionHe: "TTL הוא שדה בכותרות חבילות IP שמגביל את <strong>תוחלת החיים של נתונים</strong> ברשת. כל נתב שמעבד את החבילה מפחית את ה-TTL ב-1. כאשר TTL מגיע ל-0, החבילה נמחקת.",
        relatedTerms: ["IP", "Traceroute", "Routing"],
        visualization: null
    },
    {
        term: "SSID",
        fullName: "Service Set Identifier",
        category: "General",
        layer: "Layer 2",
        definitionEn: "The <strong>name of a wireless network</strong>. When you search for available WiFi networks on your device, the names displayed are SSIDs. Each wireless access point broadcasts its SSID so devices can find and connect to it.",
        definitionHe: "SSID הוא <strong>שם הרשת האלחוטית</strong>. כאשר מחפשים רשתות WiFi זמינות במכשיר, השמות המוצגים הם SSIDs. כל נקודת גישה אלחוטית משדרת את ה-SSID שלה כך שמכשירים יוכלו למצוא ולהתחבר.",
        relatedTerms: ["WiFi", "WPA", "Access Point"],
        visualization: null
    },
    {
        term: "WPA",
        fullName: "Wi-Fi Protected Access",
        category: "Security",
        layer: "Layer 2",
        definitionEn: "A security protocol designed to secure <strong>wireless computer networks</strong>. WPA3 (latest version) uses SAE for stronger authentication and provides 192-bit encryption. Replaced the insecure WEP standard.",
        definitionHe: "WPA הוא פרוטוקול אבטחה שנועד לאבטח <strong>רשתות מחשבים אלחוטיות</strong>. WPA3 (הגרסה האחרונה) משתמש ב-SAE לאימות חזק יותר ומספק הצפנה של 192 סיביות.",
        relatedTerms: ["WiFi", "WEP", "SSID"],
        visualization: null
    },
    {
        term: "PDU",
        fullName: "Protocol Data Unit",
        category: "General",
        layer: "",
        definitionEn: "A single unit of information transmitted in a network. The name changes at each <strong>OSI layer</strong>: Data (L7-5), Segment/Datagram (L4), Packet (L3), Frame (L2), and Bits (L1).",
        definitionHe: "PDU הוא יחידת מידע בודדת המשודרת ברשת. השם משתנה בכל <strong>שכבת OSI</strong>: Data (שכבות 7-5), Segment/Datagram (שכבה 4), Packet (שכבה 3), Frame (שכבה 2), Bits (שכבה 1).",
        relatedTerms: ["OSI Model", "Encapsulation", "Frame"],
        visualization: null
    },
    {
        term: "Proxy",
        fullName: "Proxy Server",
        category: "Security",
        layer: "Layer 7",
        definitionEn: "A server that acts as an <strong>intermediary</strong> between a client and the Internet. Proxy servers can filter content, improve performance via caching, and provide anonymity by masking the client's IP address.",
        definitionHe: "שרת Proxy הוא שרת שמשמש כ<strong>מתווך</strong> בין לקוח לאינטרנט. שרתי Proxy יכולים לסנן תוכן, לשפר ביצועים באמצעות מטמון ולספק אנונימיות על ידי הסתרת כתובת ה-IP של הלקוח.",
        relatedTerms: ["Firewall", "NAT", "VPN"],
        visualization: null
    }
];
