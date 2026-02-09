export interface ExamQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  questions: ExamQuestion[];
}

export const EXAMS: Exam[] = 
[
  {
    "id": "exam1",
    "title": "Exam 1",
    "description": "Networking & Security Fundamentals",
    "questions": [
      {
        "id": "exam1_q1",
        "text": "What is the main difference between a digital signature and a digital certificate?",
        "options": [
          "A digital signature verifies message integrity and authenticity, while a digital certificate verifies the identity of an entity.",
          "A digital signature encrypts data, while a digital certificate compresses traffic.",
          "A digital certificate verifies integrity, while a digital signature assigns IP addresses.",
          "There is no functional difference between the two."
        ],
        "correctIndex": 0,
        "explanation": "A digital signature verifies message integrity and authenticity, while a digital certificate verifies the identity of an entity. Digital signatures use cryptographic hashing and private keys to prove a message hasn't been altered and came from the claimed sender. Digital certificates are issued by Certificate Authorities to bind public keys to entities."
      },
      {
        "id": "exam1_q2",
        "text": "What is MAC address spoofing?",
        "options": [
          "Flooding a switch with fake MAC addresses.",
          "Creating a rogue DHCP server.",
          "Enabling wireless communications.",
          "Changing a device's MAC address to impersonate another device."
        ],
        "correctIndex": 3,
        "explanation": "MAC address spoofing involves changing a device's MAC address to impersonate another device. This can be used to bypass MAC-based access controls or impersonate another device on the network."
      },
      {
        "id": "exam1_q3",
        "text": "Which attack primarily threatens data integrity?",
        "options": [
          "An attacker secretly exfiltrates confidential patient records.",
          "An attacker alters or tampers with data in a database.",
          "A denial-of-service attack makes a service unavailable.",
          "An attacker steals login credentials using phishing."
        ],
        "correctIndex": 1,
        "explanation": "An attacker altering or tampering with data in a database is a direct threat to data integrity. Integrity refers to the accuracy and consistency of data."
      },
      {
        "id": "exam1_q4",
        "text": "Which attack primarily threatens data confidentiality?",
        "options": [
          "An attacker alters data in a database.",
          "An attacker destroys files to disrupt operations.",
          "An attacker secretly exfiltrates sensitive patient records.",
          "A denial-of-service attack overwhelms a website."
        ],
        "correctIndex": 2,
        "explanation": "An attacker secretly exfiltrating sensitive patient records threatens data confidentiality. Exfiltrate means to steal or extract data from a system without authorization. Confidentiality ensures that data is accessible only to authorized parties."
      },
      {
        "id": "exam1_q5",
        "text": "What is the purpose of cookies in HTTP/HTTPS?",
        "options": [
          "To encrypt all web traffic.",
          "To maintain state and user sessions in a stateless protocol.",
          "To compress web pages.",
          "To block malicious websites."
        ],
        "correctIndex": 1,
        "explanation": "Cookies maintain state and user sessions in the stateless HTTP/HTTPS protocol. Since HTTP doesn't inherently remember previous requests, cookies store session information on the client side."
      },
      {
        "id": "exam1_q6",
        "text": "A student is connected to a campus wireless network named \u201cMTA-WIFI\u201d and observes the same network name associated with different MAC addresses. Which statement is TRUE?",
        "options": [
          "The network is misconfigured.",
          "The SSID is the client\u2019s MAC address.",
          "The BSSID is the network name.",
          "The wireless network name is SSID, each access point interface has a unique MAC address - BSSID."
        ],
        "correctIndex": 3,
        "explanation": "The wireless network name is the SSID, and each access point interface has a unique MAC address called the BSSID. Multiple access points can share the same SSID but will have different BSSIDs."
      },
      {
        "id": "exam1_q7",
        "text": "What is the primary purpose of OSPF?",
        "options": [
          "To resolve domain names to IP addresses.",
          "To determine routes between autonomous systems based on policy.",
          "To determine the best routing path within an autonomous system using cost / bandwidth metrics.",
          "To select routes based solely on hop count."
        ],
        "correctIndex": 2,
        "explanation": "OSPF determines the best routing path within an autonomous system using cost/bandwidth metrics. It's an interior gateway protocol that uses link-state routing algorithms."
      },
      {
        "id": "exam1_q8",
        "text": "What information does a routing table contain?",
        "options": [
          "MAC addresses of local devices.",
          "User authentication credentials.",
          "Network destinations and the next hop or outgoing interface.",
          "Active TCP sessions."
        ],
        "correctIndex": 2,
        "explanation": "A routing table contains network destinations and the next hop or outgoing interface. This information enables routers to forward packets toward their destinations."
      },
      {
        "id": "exam1_q9",
        "text": "What is the main benefit of using VLANs in a network?",
        "options": [
          "Increasing physical link speed.",
          "Eliminating the need for routers.",
          "Automatically encrypting traffic.",
          "Logical network segmentation and separation of broadcast domains."
        ],
        "correctIndex": 3,
        "explanation": "VLANs provide logical network segmentation and separation of broadcast domains. This improves security, reduces broadcast traffic, and allows flexible network organization without physical changes."
      },
      {
        "id": "exam1_q10",
        "text": "What is the purpose of a switch\u2019s MAC address table?",
        "options": [
          "Filtering malicious traffic.",
          "Mapping MAC addresses to switch ports.",
          "Storing IP routing information.",
          "Modifying MAC addresses of devices."
        ],
        "correctIndex": 1,
        "explanation": "A switch's MAC address table maps MAC addresses to switch ports. This allows the switch to forward frames only to the appropriate port rather than flooding all ports."
      },
      {
        "id": "exam1_q11",
        "text": "What is a key difference between peer-to-peer (P2P) and client-server networks?",
        "options": [
          "Client-server networks distribute responsibility equally across all devices.",
          "P2P networks require centralized authentication.",
          "In P2P networks, each device can act as both a client and a server.",
          "P2P networks rely on dedicated servers."
        ],
        "correctIndex": 2,
        "explanation": "In P2P networks, each device can act as both a client and a server. There's no centralized server; devices communicate directly and share resources equally."
      },
      {
        "id": "exam1_q12",
        "text": "What happens to MAC and IP addresses as a packet travels through routers?",
        "options": [
          "Both MAC and IP addresses change at every hop.",
          "Neither MAC nor IP addresses change.",
          "The MAC address changes at each hop, while the IP address remains the same end-to-end.",
          "The IP address changes at each hop, while the MAC address remains the same."
        ],
        "correctIndex": 2,
        "explanation": "The MAC address changes at each hop as the packet moves through different network segments, while the IP address remains the same end-to-end (unless NAT is involved)."
      },
      {
        "id": "exam1_q13",
        "text": "What is the purpose of port numbers at the Transport layer?",
        "options": [
          "To identify physical network interfaces.",
          "To select routing paths between networks.",
          "To identify the destination application or service on a host.",
          "To resolve MAC addresses."
        ],
        "correctIndex": 2,
        "explanation": "Port numbers identify the destination application or service on a host. They allow multiple applications to use the network simultaneously on the same device."
      },
      {
        "id": "exam1_q14",
        "text": "What is TCP flow control used for?",
        "options": [
          "Making routing decisions.",
          "Assigning application identifiers.",
          "Preventing a sender from overwhelming a receiver with data.",
          "Allocating bandwidth across links."
        ],
        "correctIndex": 2,
        "explanation": "TCP flow control prevents a sender from overwhelming a receiver with data. The receiver advertises a window size indicating how much data it can accept."
      },
      {
        "id": "exam1_q15",
        "text": "What triggers TCP retransmission?",
        "options": [
          "Completion of the three-way handshake.",
          "A full receive window.",
          "Connection termination.",
          "Failure to receive an acknowledgment within the timeout period."
        ],
        "correctIndex": 3,
        "explanation": "TCP retransmission is triggered by failure to receive an acknowledgment within the timeout period. This ensures reliable delivery by resending lost packets."
      },
      {
        "id": "exam1_q16",
        "text": "When does a host need to initiate an ARP request?",
        "options": [
          "When fragmenting a packet due to MTU limits.",
          "When selecting a routing protocol.",
          "When it needs to discover the MAC address associated with a known destination IP address and a matching entry is not found in ARP cache.",
          "When resolving a DNS name."
        ],
        "correctIndex": 2,
        "explanation": "A host initiates an ARP request when it needs to discover the MAC address associated with a known destination IP address and no matching entry exists in the ARP cache."
      },
      {
        "id": "exam1_q17",
        "text": "Why do routers maintain routing tables in advance?",
        "options": [
          "To reduce packet size before forwarding.",
          "To allow immediate forwarding decisions without delay and avoid packet loss.",
          "To automatically assign IP addresses to hosts.",
          "To encrypt routing updates."
        ],
        "correctIndex": 1,
        "explanation": "Routers maintain routing tables in advance to allow immediate forwarding decisions without delay and avoid packet loss. Pre-computed routes enable fast packet forwarding."
      },
      {
        "id": "exam1_q18",
        "text": "What is the function of a subnet mask?",
        "options": [
          "Filtering malicious traffic at the network edge.",
          "Dividing switches into logical segments.",
          "Separating the network portion and host portion of an IP address.",
          "Identifying the hardware manufacturer."
        ],
        "correctIndex": 2,
        "explanation": "A subnet mask separates the network portion and host portion of an IP address. This allows routers to determine if a destination is local or remote."
      },
      {
        "id": "exam1_q19",
        "text": "Which communication mode is used by walkie-talkies?",
        "options": [
          "Full-duplex.",
          "Simplex.",
          "Multiplexed.",
          "Half-duplex."
        ],
        "correctIndex": 3,
        "explanation": "Walkie-talkies use half-duplex communication, where only one party can transmit at a time while the other listens."
      },
      {
        "id": "exam1_q20",
        "text": "What happens when a switch receives a frame with an unknown destination MAC address?",
        "options": [
          "The frame is dropped.",
          "The switch queries a router for the address.",
          "The frame is flooded out all ports except the incoming port.",
          "The frame is sent back to the source."
        ],
        "correctIndex": 2,
        "explanation": "When a switch receives a frame with an unknown destination MAC address, it floods the frame out all ports except the incoming port to ensure delivery."
      },
      {
        "id": "exam1_q21",
        "text": "What is Network Address Translation (NAT)?",
        "options": [
          "A DNS caching mechanism.",
          "A protocol for automatic IP assignment.",
          "A technique that translates private IP addresses to a public IP address.",
          "A method for encrypting network traffic."
        ],
        "correctIndex": 2,
        "explanation": "NAT translates private IP addresses to a public IP address. This conserves public IP addresses and provides a layer of security by hiding internal network structure."
      },
      {
        "id": "exam1_q22",
        "text": "What does the netstat command display?",
        "options": [
          "Cached DNS records.",
          "Active network connections and listening ports.",
          "Hardware details of network adapters.",
          "Available wireless networks."
        ],
        "correctIndex": 1,
        "explanation": "The netstat command displays active network connections and listening ports. It's useful for troubleshooting and security monitoring."
      },
      {
        "id": "exam1_q23",
        "text": "What is the primary goal of subnetting?",
        "options": [
          "Simplifying DNS resolution.",
          "Reducing broadcast traffic and improving security and performance.",
          "Increasing the speed of network cables.",
          "Removing the need for routers."
        ],
        "correctIndex": 1,
        "explanation": "The primary goal of subnetting is reducing broadcast traffic and improving security and performance. It divides large networks into smaller, more manageable segments."
      },
      {
        "id": "exam1_q24",
        "text": "What is the main difference between circuit switching and packet switching?",
        "options": [
          "Circuit switching is more secure.",
          "Circuit switching establishes a dedicated path, while packet switching sends data in discrete packets over shared paths.",
          "Circuit switching is used only for data networks.",
          "Packet switching requires a dedicated physical circuit."
        ],
        "correctIndex": 1,
        "explanation": "Circuit switching establishes a dedicated path for the duration of communication, while packet switching sends data in discrete packets over shared paths, allowing more efficient resource utilization."
      },
      {
        "id": "exam1_q25",
        "text": "What is the main advantage of TCP over UDP?",
        "options": [
          "Simpler implementation.",
          "Higher transmission speed.",
          "Lower protocol overhead.",
          "Reliable delivery with sequencing, error detection, and retransmission."
        ],
        "correctIndex": 3,
        "explanation": "TCP provides reliable delivery with sequencing, error detection, and retransmission. This ensures data arrives correctly and in order, unlike UDP."
      },
      {
        "id": "exam1_q26",
        "text": "What is the defining characteristic of UDP?",
        "options": [
          "Automatic retransmission of lost packets.",
          "Guaranteed, ordered delivery.",
          "Connection establishment before data transfer.",
          "Connectionless communication with no delivery guarantees."
        ],
        "correctIndex": 3,
        "explanation": "UDP is characterized by connectionless communication with no delivery guarantees. It's faster and has less overhead than TCP but doesn't ensure reliability."
      },
      {
        "id": "exam1_q27",
        "text": "What does the traceroute (tracert) command do?",
        "options": [
          "Displays MAC address tables.",
          "Shows ARP cache..",
          "Shows the path packets take to reach a destination.",
          "Modifies routing tables."
        ],
        "correctIndex": 2,
        "explanation": "Traceroute shows the path packets take to reach a destination by displaying each router hop along the way."
      },
      {
        "id": "exam1_q28",
        "text": "What is multiplexing in networking?",
        "options": [
          "A method of encrypting data streams.",
          "A mechanism for assigning IP addresses.",
          "Combining multiple data streams for transmission over a single channel.",
          "Maintaining session information at the application layer."
        ],
        "correctIndex": 2,
        "explanation": "Multiplexing combines multiple data streams for transmission over a single channel. At the transport layer, multiplexing allows multiple applications on the same host to share the network connection simultaneously. Port numbers serve as multiplexing identifiers, enabling the transport layer to deliver data from the network to the correct application process."
      },
      {
        "id": "exam1_q29",
        "text": "Which statement correctly describes unicast, broadcast, and multicast communication?",
        "options": [
          "All-to-all, one-to-one, and random delivery.",
          "Group-based, all-hosts, and single-host delivery.",
          "One-to-one, one-to-all, and one-to-many delivery.",
          "Random delivery models."
        ],
        "correctIndex": 2,
        "explanation": "Unicast is one-to-one delivery, broadcast is one-to-all delivery, and multicast is one-to-many delivery to a specific group."
      },
      {
        "id": "exam1_q30",
        "text": "What is the default gateway?",
        "options": [
          "The DNS server address.",
          "The router used to forward traffic outside the local network.",
          "The subnet broadcast address.",
          "The last usable IP address."
        ],
        "correctIndex": 1,
        "explanation": "The default gateway is the router used to forward traffic outside the local network. Hosts send packets destined for remote networks to this router."
      },
      {
        "id": "exam1_q31",
        "text": "What happens to the TTL (Time To Live) field as a packet passes through routers?",
        "options": [
          "It remains unchanged.",
          "It increases.",
          "It decreases by one at each hop.",
          "It is reset at every router."
        ],
        "correctIndex": 2,
        "explanation": "The TTL field decreases by one at each hop through a router. This prevents packets from circulating indefinitely in routing loops."
      },
      {
        "id": "exam1_q32",
        "text": "What is encapsulation in networking?",
        "options": [
          "Selecting the optimal routing path.",
          "Negotiating session parameters.",
          "Adding protocol headers as data moves down through OSI layers.",
          "Removing protocol headers as data moves up through OSI layers."
        ],
        "correctIndex": 2,
        "explanation": "Encapsulation is the process of adding protocol headers as data moves down through OSI layers. Each layer adds its own header information."
      },
      {
        "id": "exam1_q33",
        "text": "Which statement correctly compares mesh and star network topologies?",
        "options": [
          "Star topology has no central device.",
          "Mesh topology is always cheaper to deploy.",
          "Star topology provides higher fault tolerance.",
          "Mesh topology provides higher fault tolerance but is more complex and expensive than star topology."
        ],
        "correctIndex": 3,
        "explanation": "Mesh topology provides higher fault tolerance due to multiple redundant paths, but is more complex and expensive than star topology, which relies on a central device."
      },
      {
        "id": "exam1_q34",
        "text": "What is the purpose of TCP congestion control?",
        "options": [
          "To prevent packet sniffing attacks at the transport layer.",
          "To dynamically adjust the sender\u2019s transmission rate based on current network conditions in order to reduce packet loss and maintain stable data delivery.",
          "To assign port numbers to applications.",
          "To encrypt TCP data payloads."
        ],
        "correctIndex": 1,
        "explanation": "TCP congestion control dynamically adjusts the sender's transmission rate based on current network conditions to reduce packet loss and maintain stable data delivery."
      },
      {
        "id": "exam1_q35",
        "text": "What is APIPA (Automatic Private IP Addressing) used for?",
        "options": [
          "Translating private addresses to public addresses.",
          "Caching DNS responses locally.",
          "Automatically assigning an IP address when no DHCP server is available.",
          "Resolving MAC addresses using ARP."
        ],
        "correctIndex": 2,
        "explanation": "APIPA automatically assigns an IP address (169.254.x.x range) when no DHCP server is available, allowing limited local network connectivity."
      },
      {
        "id": "exam1_q36",
        "text": "What is the main difference between SMTP and POP3/IMAP?",
        "options": [
          "Encryption capability.",
          "Performance characteristics.",
          "Message storage method.",
          "SMTP is used for sending email, while POP3/IMAP are used for retrieving email."
        ],
        "correctIndex": 3,
        "explanation": "SMTP is used for sending email between mail servers, while POP3/IMAP are used for retrieving email from a mail server to a client."
      },
      {
        "id": "exam1_q37",
        "text": "What is the correct sequence of messages in the DHCP process?",
        "options": [
          "Offer \u2192 Discover \u2192 Acknowledge \u2192 Request",
          "Discover \u2192 Request \u2192 Offer \u2192 Acknowledge",
          "Request \u2192 Discover \u2192 Offer \u2192 Acknowledge",
          "Discover \u2192 Offer \u2192 Request \u2192 Acknowledge"
        ],
        "correctIndex": 3,
        "explanation": "The correct DHCP sequence is: Discover \u2192 Offer \u2192 Request \u2192 Acknowledge (DORA). The client discovers servers, receives offers, requests an address, and receives acknowledgment."
      },
      {
        "id": "exam1_q38",
        "text": "What happens when a router receives a packet with no matching route?",
        "options": [
          "A new IP address is assigned automatically.",
          "The packet is forwarded using a default route if available, otherwise dropped.",
          "The packet is flooded to all interfaces.",
          "The packet is returned to the sender."
        ],
        "correctIndex": 1,
        "explanation": "When a router receives a packet with no matching route, it forwards the packet using a default route if available; otherwise, the packet is dropped."
      },
      {
        "id": "exam1_q39",
        "text": "What information is typically revealed by an HTTP server banner?",
        "options": [
          "Client browser details.",
          "Database credentials.",
          "SSL certificate expiration date.",
          "Web server software name and version."
        ],
        "correctIndex": 3,
        "explanation": "HTTP server banners typically reveal web server software name and version. This information can be useful for attackers in identifying potential vulnerabilities."
      },
      {
        "id": "exam1_q40",
        "text": "What is the difference between stateless and stateful protocols?",
        "options": [
          "Stateless protocols track sessions, while stateful protocols do not.",
          "Stateless protocols such as UDP do not maintain session state, while stateful protocols such as TCP track connection state.",
          "Stateful protocols are always faster.",
          "Only stateless protocols use port numbers."
        ],
        "correctIndex": 1,
        "explanation": "Stateless protocols like UDP do not maintain session state between requests, while stateful protocols like TCP track connection state including sequence numbers and acknowledgments."
      }
    ]
  },
  {
    "id": "exam2",
    "title": "Exam 2",
    "description": "Intermediate Networking Concepts",
    "questions": [
      {
        "id": "exam2_q1",
        "text": "What is the main function of the OSI Layer 1 (Physical Layer)?",
        "options": [
          "Establishes end-to-end communication.",
          "Ensures reliable data delivery.",
          "Provides IP addressing.",
          "Transmits raw bits over a medium."
        ],
        "correctIndex": 3,
        "explanation": "Transmits raw bits over a medium. \u25cf\u200b Layer 1 (Physical) is responsible for the actual transmission of raw binary data over cables, fiber, or wireless. It doesn\u2019t handle addressing or reliability."
      },
      {
        "id": "exam2_q2",
        "text": "A workstation is connected to a switch and successfully communicates with a server on the same subnet. Later, the workstation's network interface card (NIC) is replaced, but its IP address remains the same. What will most likely happen when the workstation tries to communicate again?",
        "options": [
          "Communication will fail permanently because IP addresses are bound to hardware MAC addresses.",
          "The switch will update its MAC table, ARP will resolve the new MAC address, and communication will resume normally.",
          "The switch will drop all frames from the workstation until it is rebooted.",
          "The router must be involved to reassign the IP address before communication can continue."
        ],
        "correctIndex": 1,
        "explanation": "The switch will update its MAC table, ARP will resolve the new MAC address, and communication will resume normally. \u25cf\u200b Replacing the NIC changes the MAC address. The switch updates its MAC table automatically, and ARP ensures the correct MAC is used for IP communication."
      },
      {
        "id": "exam2_q3",
        "text": "Which of these IP addresses is a private IPv4 address?",
        "options": [
          "8.8.8.8.",
          "172.15.10.5.",
          "192.168.1.10.",
          "200.100.50.25."
        ],
        "correctIndex": 2,
        "explanation": "192.168.1.10. \u25cf\u200b Private IPv4 ranges include 10.0.0.0/8, 172.16.0.0\u2013172.31.255.255, and"
      },
      {
        "id": "exam2_q4",
        "text": "What protocol is used to resolve IP addresses to MAC addresses?",
        "options": [
          "DHCP.",
          "ICMP.",
          "ARP.",
          "DNS."
        ],
        "correctIndex": 2,
        "explanation": "ARP. \u25cf\u200b ARP (Address Resolution Protocol) resolves IP addresses to MAC addresses for devices on the same local network."
      },
      {
        "id": "exam2_q5",
        "text": "In a client-server model, what is the role of the client?",
        "options": [
          "Provides resources to the network.",
          "Requests resources from the server.",
          "Monitors network traffic.",
          "Routes packets between servers."
        ],
        "correctIndex": 1,
        "explanation": "Requests resources from the server. \u25cf\u200b In a client-server model, clients initiate requests, and servers respond with resources."
      },
      {
        "id": "exam2_q6",
        "text": "Two computers are connected to the same physical switch but assigned to different VLANs. Both computers are in the same IP subnet. What will happen when one computer tries to communicate with the other?",
        "options": [
          "Communication will succeed because devices in the same IP subnet can always communicate directly.",
          "Communication will succeed only if ARP caching is enabled on the switch.",
          "Communication will fail because VLANs separate broadcast domains and require routing to pass traffic between them.",
          "Communication will fail because switches do not support VLAN tagging."
        ],
        "correctIndex": 2,
        "explanation": "Communication will fail because VLANs separate broadcast domains and require routing to pass traffic between them. \u25cf\u200b Even if IPs are in the same subnet, VLANs isolate Layer 2 traffic; routing is needed to communicate across VLANs."
      },
      {
        "id": "exam2_q7",
        "text": "Why is UDP generally faster than TCP?",
        "options": [
          "It compresses packets before sending.",
          "It does not perform acknowledgments or retransmissions.",
          "Always uses higher bandwidth than TCP.",
          "It is a stateful protocol."
        ],
        "correctIndex": 1,
        "explanation": "It does not perform acknowledgments or retransmissions. \u25cf\u200b UDP is connectionless, so it avoids the overhead of TCP\u2019s reliability features, making it faster but less reliable."
      },
      {
        "id": "exam2_q8",
        "text": "What is the main purpose of the TCP three-way handshake?",
        "options": [
          "To establish a reliable connection.",
          "To encrypt communication.",
          "To resolve IP addresses.",
          "To route packets."
        ],
        "correctIndex": 0,
        "explanation": "To establish a reliable connection. \u25cf\u200b The TCP three-way handshake (SYN \u2192 SYN-ACK \u2192 ACK) establishes a connection and synchronizes sequence numbers."
      },
      {
        "id": "exam2_q9",
        "text": "Which TCP mechanism ensures reliable delivery of data?",
        "options": [
          "Sequence numbers and acknowledgments.",
          "Assigning IP addresses dynamically.",
          "Sending packets without acknowledgment.",
          "Broadcasting data."
        ],
        "correctIndex": 0,
        "explanation": "Sequence numbers and acknowledgments. \u25cf\u200b TCP uses sequence numbers and ACKs to ensure all data arrives and can be reassembled in order."
      },
      {
        "id": "exam2_q10",
        "text": "Which of the following is a function of TCP flow control?",
        "options": [
          "Establishes a connection using a three-way handshake.",
          "Prevents the sender from overwhelming the receiver.",
          "Detects network congestion and reduces the sending rate accordingly.",
          "Ensures reliable delivery by retransmitting lost segments."
        ],
        "correctIndex": 1,
        "explanation": "Prevents the sender from overwhelming the receiver. \u25cf\u200b TCP flow control uses the receiver\u2019s advertised window to limit how much unacknowledged data can be sent at once."
      },
      {
        "id": "exam2_q11",
        "text": "Which of the following is a function of Layer 3 (Network Layer)?",
        "options": [
          "Physical transmission of bits.",
          "Routing and logical addressing.",
          "Error correction in frames.",
          "Managing sessions."
        ],
        "correctIndex": 1,
        "explanation": "Routing and logical addressing. \u25cf\u200b Layer 3 (Network) handles logical addressing (IP) and routing packets between networks."
      },
      {
        "id": "exam2_q12",
        "text": "When would a network administrator prefer to configure a static IP address manually instead of using DHCP?",
        "options": [
          "For devices that need temporary IPs for short-term testing or guest access.",
          "For servers, printers, or network devices that require a permanent, predictable IP for accessibility and management.",
          "For client computers that are rarely connected to the network but still need IPs dynamically.",
          "For mobile devices that frequently move between networks and benefit from automatic IP assignment."
        ],
        "correctIndex": 1,
        "explanation": "For servers, printers, or network devices that require a permanent, predictable IP for accessibility and management. \u25cf\u200b Static IPs ensure critical devices can always be reached reliably without depending on DHCP."
      },
      {
        "id": "exam2_q13",
        "text": "Host A has IP 192.168.1.10/24 and wants to send a packet to Host B at 192.168.2.5. What role does the subnet mask play in Host A's decision?",
        "options": [
          "It allows Host A to send the packet directly to Host B using only ARP, ignoring the default gateway.",
          "It splits Host B's MAC address into network and host portions to guide frame delivery.",
          "It determines which DNS server Host A should query to resolve Host B's IP.",
          "It helps Host A decide that Host B is outside its subnet and the packet must be sent via the default gateway."
        ],
        "correctIndex": 3,
        "explanation": "It helps Host A decide that Host B is outside its subnet and the packet must be sent via the default gateway. \u25cf\u200b The subnet mask determines whether a destination is local or requires routing."
      },
      {
        "id": "exam2_q14",
        "text": "Which network topology connects all devices in a closed loop?",
        "options": [
          "Star.",
          "Ring.",
          "Bus.",
          "Mesh."
        ],
        "correctIndex": 1,
        "explanation": "Ring. \u25cf\u200b Ring topology connects devices in a closed loop; each device connects to two neighbors."
      },
      {
        "id": "exam2_q15",
        "text": "Why do transport layer protocols use both well-known and ephemeral ports?",
        "options": [
          "Well-known ports identify services; ephemeral ports allow temporary connections.",
          "Ephemeral ports reduce packet loss for multiple clients.",
          "Both types assign IP addresses dynamically.",
          "Well-known ports broadcast data; ephemeral ports detect errors."
        ],
        "correctIndex": 0,
        "explanation": "Well-known ports identify services; ephemeral ports allow temporary connections. \u25cf\u200b Servers listen on well-known ports; clients use ephemeral ports to create unique sessions."
      },
      {
        "id": "exam2_q16",
        "text": "What is the main difference between P2P and client-server networks?",
        "options": [
          "P2P always has a central server; client-server does not.",
          "Client-server networks do not use IP addressing.",
          "Client-server has a central server; P2P peers share resources directly.",
          "P2P networks are faster in all scenarios than client-server."
        ],
        "correctIndex": 2,
        "explanation": "Client-server has a central server; P2P peers share resources directly. \u25cf\u200b Client-server relies on a central server; P2P peers act as both client and server."
      },
      {
        "id": "exam2_q17",
        "text": "Which command is used to test connectivity between two hosts?",
        "options": [
          "arp -a.",
          "netstat.",
          "ipconfig.",
          "ping."
        ],
        "correctIndex": 3,
        "explanation": "ping. \u25cf\u200b ping tests connectivity by sending ICMP echo requests and waiting for replies."
      },
      {
        "id": "exam2_q18",
        "text": "Host A (192.168.1.10/24) wants to send traffic to Host B (192.168.1.20/24) on the same VLAN. Host A does not yet have an ARP entry for Host B. What sequence of events correctly describes how communication is established?",
        "options": [
          "Host A sends the IP packet directly to the switch, which routes it to Host B based on the destination IP address.",
          "Host A broadcasts an ARP request to learn Host B's MAC address, Host B replies with its MAC address, and Host A then sends the IP packet encapsulated in an Ethernet frame addressed to Host B's MAC.",
          "Host A sends a unicast ARP request to Host B using its IP address, and the switch resolves the MAC automatically.",
          "Host A forwards the packet to the default gateway, which responds with Host B's MAC address and delivers the packet."
        ],
        "correctIndex": 1,
        "explanation": "Host A broadcasts an ARP request\u2026 \u25cf\u200b ARP requests are broadcast to learn MAC addresses. Once Host B responds, Host A can send the IP packet encapsulated in Ethernet."
      },
      {
        "id": "exam2_q19",
        "text": "Which protocol automatically assigns IP addresses to devices?",
        "options": [
          "DNS.",
          "ARP.",
          "DHCP.",
          "SMTP."
        ],
        "correctIndex": 2,
        "explanation": "DHCP. \u25cf\u200b DHCP automatically assigns IP addresses and other network configuration to hosts."
      },
      {
        "id": "exam2_q20",
        "text": "Host A (192.168.1.10) sends a packet to Server B (10.0.0.20) located on a remote network. The traffic passes through a default gateway router. Which statement correctly describes how the IP and MAC addresses change as the packet travels from Host A to Server B?",
        "options": [
          "Both the IP addresses and MAC addresses change at every hop.",
          "The MAC addresses remain the same end-to-end, while the IP addresses change at each router.",
          "The destination IP address changes at each hop, while the source MAC address remains constant.",
          "The source and destination IP addresses remain the same end-to-end, while the source and destination MAC addresses change at each hop."
        ],
        "correctIndex": 3,
        "explanation": "The source and destination IP addresses remain the same end-to-end, while the source and destination MAC addresses change at each hop. \u25cf\u200b IP addresses are end-to-end; MAC addresses are hop-to-hop within each network segment."
      },
      {
        "id": "exam2_q21",
        "text": "Which of the following best describes OSPF and its role in routing decisions?",
        "options": [
          "OSPF assigns IP addresses automatically.",
          "OSPF encrypts network traffic.",
          "OSPF is a distance-vector protocol using hop count.",
          "OSPF is a link-state protocol using cost metrics."
        ],
        "correctIndex": 3,
        "explanation": "OSPF is a link-state protocol using cost metrics. \u25cf\u200b OSPF maintains a complete map of the network and calculates shortest paths using cost metrics."
      },
      {
        "id": "exam2_q22",
        "text": "Which of the following best describes the TCP sliding window mechanism?",
        "options": [
          "Ensures packets are delivered in order using sequence numbers.",
          "Controls the amount of unacknowledged data in transit to optimize throughput and prevent congestion.",
          "Signals the receiver to acknowledge received segments.",
          "Divides data into segments for reliable transmission."
        ],
        "correctIndex": 1,
        "explanation": "Controls the amount of unacknowledged data in transit\u2026 \u25cf\u200b TCP sliding window regulates flow and keeps the connection efficient without overwhelming the receiver."
      },
      {
        "id": "exam2_q23",
        "text": "Which attack involves a rogue access point pretending to be a legitimate network?",
        "options": [
          "Phishing.",
          "DNS Spoofing.",
          "ARP Poisoning.",
          "Evil Twin."
        ],
        "correctIndex": 3,
        "explanation": "Evil Twin. \u25cf\u200b An Evil Twin attack involves a rogue AP pretending to be legitimate to intercept traffic."
      },
      {
        "id": "exam2_q24",
        "text": "What is the main purpose of multi-factor authentication (MFA)?",
        "options": [
          "To verify user identity using two passwords.",
          "To verify user identity using multiple fingerprints.",
          "To detect malware.",
          "To verify user identity using multiple factors."
        ],
        "correctIndex": 3,
        "explanation": "To verify user identity using multiple factors. \u25cf\u200b MFA improves security by requiring multiple independent proofs (something you know, have, or are)."
      },
      {
        "id": "exam2_q25",
        "text": "What is a key benefit of using cloud computing compared to on-premises infrastructure?",
        "options": [
          "Provides scalable resources on demand without upfront hardware investment.",
          "Requires no Internet connectivity.",
          "Eliminates the need for all security controls.",
          "Guarantees zero downtime for all services."
        ],
        "correctIndex": 0,
        "explanation": "Provides scalable resources on demand without upfront hardware investment. \u25cf\u200b Cloud computing enables elastic resources, avoiding the cost and maintenance of physical infrastructure."
      },
      {
        "id": "exam2_q26",
        "text": "Which type of IP address can be routed over the public Internet?",
        "options": [
          "Private IP.",
          "Public IP.",
          "Loopback IP.",
          "APIPA."
        ],
        "correctIndex": 1,
        "explanation": "Public IP. \u25cf\u200b Public IPs are routable on the Internet; private IPs are used inside networks only."
      },
      {
        "id": "exam2_q27",
        "text": "Which of the following best describes NAT (Network Address Translation)?",
        "options": [
          "Stores recent DNS queries.",
          "Assigns dynamic DNS names.",
          "Translates private IP addresses to public IP addresses.",
          "Routes packets within the same LAN only."
        ],
        "correctIndex": 2,
        "explanation": "Translates private IP addresses to public IP addresses. \u25cf\u200b NAT allows multiple private hosts to share a single public IP for Internet access."
      },
      {
        "id": "exam2_q28",
        "text": "Which of the following is true about DNS?",
        "options": [
          "Resolves MAC addresses.",
          "Routes packets between networks.",
          "Provides IP address assignment for DHCP.",
          "Translates domain names into IP addresses."
        ],
        "correctIndex": 3,
        "explanation": "Translates domain names into IP addresses. \u25cf\u200b DNS converts human-readable domain names into numerical IP addresses."
      },
      {
        "id": "exam2_q29",
        "text": "Host A has IP address 192.168.1.2/24 and Host B has IP address 192.168.2.2/24. Both hosts are connected to the same switch. What is required for Host A and Host B to successfully communicate with each other, and why?",
        "options": [
          "Communication will work automatically because both hosts are connected to the same switch.",
          "A router or Layer 3 device is required because the hosts are in different IP subnets and need routing to forward traffic between networks.",
          "Communication will work only if both hosts have the same MAC address vendor (OUI).",
          "ARP alone is sufficient because it resolves IP addresses across different subnets."
        ],
        "correctIndex": 1,
        "explanation": "A router or Layer 3 device is required\u2026 \u25cf\u200b Hosts in different subnets require routing even if connected to the same switch."
      },
      {
        "id": "exam2_q30",
        "text": "Which of the following best describes BGP?",
        "options": [
          "An internal routing protocol.",
          "A routing protocol based on hop count in AS.",
          "An external routing protocol between autonomous systems.",
          "A wireless network protocol."
        ],
        "correctIndex": 2,
        "explanation": "An external routing protocol between autonomous systems. \u25cf\u200b BGP operates between autonomous systems, not within a single network."
      },
      {
        "id": "exam2_q31",
        "text": "Which TCP mechanism ensures packets are delivered in order?",
        "options": [
          "Flow control using the receiver's advertised window.",
          "Congestion control through window size reduction.",
          "Sequencing and acknowledgments.",
          "Error detection using checksums only."
        ],
        "correctIndex": 2,
        "explanation": "Sequencing and acknowledgments. \u25cf\u200b TCP ensures in-order delivery by numbering segments and sending acknowledgments."
      },
      {
        "id": "exam2_q32",
        "text": "Which protocol provides an encrypted connection for remote login and command execution?",
        "options": [
          "Telnet.",
          "FTP.",
          "SSH.",
          "HTTP."
        ],
        "correctIndex": 2,
        "explanation": "SSH. \u25cf\u200b SSH provides an encrypted channel for remote login and command execution."
      },
      {
        "id": "exam2_q33",
        "text": "What is the purpose of multiplexing at the Transport Layer (Layer 4)?",
        "options": [
          "Compressing packets to reduce bandwidth usage.",
          "Allowing multiple application processes to share a single network connection using port numbers.",
          "Detecting transmission errors at the frame level.",
          "Dynamically assigning IP addresses to hosts on the network."
        ],
        "correctIndex": 1,
        "explanation": "Allowing multiple application processes to share a single network connection using port numbers. \u25cf\u200b Multiplexing uses ports to separate different applications over the same transport connection."
      },
      {
        "id": "exam2_q34",
        "text": "Which of the following describes the difference between hub, switch, and router?",
        "options": [
          "Hub broadcasts to all; switch forwards by MAC; router forwards by IP.",
          "Hub forwards by IP; switch by MAC; router broadcasts to all.",
          "Router forwards by MAC; switch by IP; hub forwards all traffic.",
          "Switch forwards by IP; router forwards by MAC; hub drops unknown frames."
        ],
        "correctIndex": 0,
        "explanation": "Hub broadcasts to all; switch directs by MAC; router directs by IP. \u25cf\u200b This is the fundamental difference in how Layer 1, 2, and 3 devices forward traffic."
      },
      {
        "id": "exam2_q35",
        "text": "Which of the following is a function of Layer 4 (Transport Layer)?",
        "options": [
          "Provides physical transmission over cables.",
          "Maps IP to MAC addresses.",
          "Resolves domain names.",
          "Provides end-to-end communication and multiplexing."
        ],
        "correctIndex": 3,
        "explanation": "Provides end-to-end communication and multiplexing. \u25cf\u200b Layer 4 handles reliable transport, sequencing, flow control, and allows multiple applications to share connections."
      },
      {
        "id": "exam2_q36",
        "text": "In which scenario is using UDP generally preferred over TCP?",
        "options": [
          "Real-time audio or video streaming where speed is more important than guaranteed delivery.",
          "Browsing the web where reliability and congestion control are important.",
          "Transferring large files that must be error-free.",
          "Sending critical emails where reliable delivery is required."
        ],
        "correctIndex": 0,
        "explanation": "Real-time audio or video streaming\u2026 \u25cf\u200b UDP is preferred for low-latency applications where speed matters more than guaranteed delivery."
      },
      {
        "id": "exam2_q37",
        "text": "In a switch, what happens when a frame arrives with a destination MAC address that is not in the MAC table?",
        "options": [
          "The switch floods the frame out all ports except the one it arrived on.",
          "The frame is dropped immediately.",
          "The switch sends the frame back to the source.",
          "The switch forwards only to known MAC addresses."
        ],
        "correctIndex": 0,
        "explanation": "The switch floods the frame out all ports except the one it arrived on. \u25cf\u200b Unknown destination MAC addresses are flooded so the correct host can respond."
      },
      {
        "id": "exam2_q38",
        "text": "Which of the following best describes a dynamic routing protocol?",
        "options": [
          "Manually configured by the network administrator.",
          "Automatically adapts routes based on network topology changes.",
          "Maintains a static route table.",
          "Assigns MAC addresses to devices."
        ],
        "correctIndex": 1,
        "explanation": "Automatically adapts routes based on network topology changes. \u25cf\u200b Dynamic routing protocols update routes automatically when the network changes."
      },
      {
        "id": "exam2_q39",
        "text": "What is the main difference between a LAN and a WAN?",
        "options": [
          "A LAN covers a small geographic area like a building, office, while a WAN connects multiple LANs over large distances.",
          "A LAN provides public Internet access, while a WAN is private only.",
          "A LAN always uses wireless, while a WAN always uses fiber.",
          "A LAN routes traffic between countries, while a WAN is local only."
        ],
        "correctIndex": 0,
        "explanation": "A LAN covers a small geographic area\u2026 \u25cf\u200b LANs are local networks; WANs connect multiple LANs over large distances."
      },
      {
        "id": "exam2_q40",
        "text": "Which of the following best describes unicast, broadcast, and multicast communication?",
        "options": [
          "Unicast sends data to a single specific device, broadcast sends to all devices in the network, multicast sends to a selected group of devices.",
          "Unicast and multicast are the same; broadcast sends to only one device.",
          "Unicast sends to a group of devices, broadcast sends to a single device, multicast sends to all devices.",
          "Unicast sends data to all devices, broadcast sends to a single device, multicast sends to one random device."
        ],
        "correctIndex": 0,
        "explanation": "Unicast sends data to a single specific device, broadcast sends to all devices in the network, multicast sends to a selected group of devices. \u25cf\u200b This describes the standard addressing types used in networks."
      }
    ]
  },
  {
    "id": "exam3",
    "title": "Exam 3",
    "description": "Final Comprehensive Exam",
    "questions": [
      {
        "id": "exam3_q1",
        "text": "Which statement best describes the purpose of the OSI layers and their benefits in networking?",
        "options": [
          "The OSI layers focus primarily on securing network communication by enforcing confidentiality, integrity, and availability.",
          "The OSI layers provide a standard framework that separates network communication into layers, making networks easier to build, manage, and troubleshoot.",
          "The OSI layers define specific hardware devices needed for building networks.",
          "The OSI layers are designed to move all networking functions to cloud platforms."
        ],
        "correctIndex": 1,
        "explanation": "The OSI model splits networking into layers, so devices and protocols can work together. It\u2019s not about security, hardware only, or cloud."
      },
      {
        "id": "exam3_q2",
        "text": "Which statement correctly describes the difference between switch and router?",
        "options": [
          "A switch works at Layer 2 and forwards frames in the same LAN using MAC addresses; a router works at Layer 3 and forwards packets between different networks using IP addresses.",
          "A switch works at Layer 3 and forwards packets between networks; a router works at Layer 2 and forwards frames in the same LAN.",
          "Both switch and router only transmit raw bits at Layer 1.",
          "A switch routes traffic between networks; a router only forwards frames in a LAN."
        ],
        "correctIndex": 0,
        "explanation": "Switch works at Layer 2 (frames, MAC addresses) inside a LAN. Router works at Layer 3 (packets, IP) to send traffic between networks."
      },
      {
        "id": "exam3_q3",
        "text": "What best describes the difference between a LAN and a WAN?",
        "options": [
          "LANs only use wireless; WANs only use wired.",
          "LAN is always slower; WAN is faster.",
          "LAN connects devices in a small area; WAN connects multiple networks over large areas.",
          "WAN is always isolated and cannot connect to the Internet."
        ],
        "correctIndex": 2,
        "explanation": "LAN = small area (home/office). WAN = big area (internet or multiple sites)."
      },
      {
        "id": "exam3_q4",
        "text": "What is the main purpose of Multiplexing?",
        "options": [
          "Multiple IP addresses in one computer.",
          "Multiple hops in a packet journey.",
          "Multiple applications and services in one data stream.",
          "Multiple users logged into one computer."
        ],
        "correctIndex": 2,
        "explanation": "Multiplexing combines multiple services into a single data stream. It\u2019s not IPs or hops."
      },
      {
        "id": "exam3_q5",
        "text": "Which topology provides the highest fault tolerance?",
        "options": [
          "Star.",
          "Mesh.",
          "Ring.",
          "Bus."
        ],
        "correctIndex": 1,
        "explanation": "Mesh allows multiple paths, so network still works if one link fails. Star or ring fail if main links go down."
      },
      {
        "id": "exam3_q6",
        "text": "What is the primary purpose of the traceroute / tracert command?",
        "options": [
          "Test if a host is reachable and measure round-trip time.",
          "Show active connections and listening ports on the local host.",
          "Find the path through routers from source to destination using TTL and ICMP messages.",
          "Show IP-to-MAC address mappings in the local ARP cache."
        ],
        "correctIndex": 2,
        "explanation": "Traceroute uses TTL to see which routers a packet passes. Ping only tests reachability, netstat shows connections, ARP shows MAC addresses."
      },
      {
        "id": "exam3_q7",
        "text": "Which statement correctly describes the difference between public, private, and hybrid clouds?",
        "options": [
          "Public cloud is dedicated; private cloud is shared; hybrid is only for backup.",
          "Private cloud is hosted on the Internet; public cloud is on-premises; hybrid removes local infrastructure.",
          "Public cloud is shared infrastructure; private cloud is for one organization; hybrid combines both.",
          "Public, private, and hybrid clouds differ only in cost."
        ],
        "correctIndex": 2,
        "explanation": "Public = shared, Private = single org, Hybrid = mix of both."
      },
      {
        "id": "exam3_q8",
        "text": "Nmap is mainly used during which phase of a cyber attack?",
        "options": [
          "Exploitation.",
          "Reconnaissance.",
          "Privilege escalation.",
          "Covering tracks."
        ],
        "correctIndex": 1,
        "explanation": "Nmap scans to find hosts/services before attacking."
      },
      {
        "id": "exam3_q9",
        "text": "What is encapsulation in networking?",
        "options": [
          "Combining multiple application data streams into one channel.",
          "Negotiating session settings.",
          "Adding headers to data as it moves down OSI layers.",
          "Choosing the best route for a packet."
        ],
        "correctIndex": 2,
        "explanation": "Each layer adds a header (Layer 4 TCP/UDP, Layer 3 IP, Layer 2 Ethernet). This is how data is prepared for transmission."
      },
      {
        "id": "exam3_q10",
        "text": "What happens to MAC and IP addresses of a packet as it travels across routers on the Internet?",
        "options": [
          "Source MAC stays the same; destination IP changes.",
          "MAC and IP stay the same.",
          "MAC addresses change at each router; IP addresses stay the same.",
          "Source IP changes at each router."
        ],
        "correctIndex": 2,
        "explanation": "MAC addresses change at each router (Layer 2), but IP addresses stay the same (Layer 3)."
      },
      {
        "id": "exam3_q11",
        "text": "Ethernet works mainly at which OSI layer?",
        "options": [
          "Physical (Layer 1).",
          "Transport (Layer 4).",
          "Network (Layer 3).",
          "Data Link (Layer 2)."
        ],
        "correctIndex": 3,
        "explanation": "Ethernet frames are Layer 2. Physical layer transmits raw bits."
      },
      {
        "id": "exam3_q12",
        "text": "The default gateway is:",
        "options": [
          "The DNS server.",
          "The broadcast address.",
          "The first router a host uses to send packets outside the subnet.",
          "The last IP address in a subnet."
        ],
        "correctIndex": 2,
        "explanation": "Gateway is the router used when the destination is outside the local subnet."
      },
      {
        "id": "exam3_q13",
        "text": "What is the main function of DNS?",
        "options": [
          "Forward packets between networks.",
          "Translate domain names to IP addresses.",
          "Monitor network availability.",
          "Assign IP addresses."
        ],
        "correctIndex": 1,
        "explanation": "DNS translates names like google.com into IP addresses."
      },
      {
        "id": "exam3_q14",
        "text": "Host A sends an IP packet to Host B. TTL = 2. There are 2 routers between them. Will it arrive?",
        "options": [
          "Yes, TTL increases by 1 at each router.",
          "No, the packet will be dropped at the second router when TTL reaches 0, and an ICMP \u201cTime Exceeded\u201d is sent back.",
          "Yes, TTL stays constant during transit.",
          "No, it will loop back to Host A."
        ],
        "correctIndex": 1,
        "explanation": "TTL decreases by 1 at each router. After two routers, TTL = 0 \u2192 packet is dropped. ICMP \u201cTime Exceeded\u201d is returned."
      },
      {
        "id": "exam3_q15",
        "text": "Which protocol is used for sending emails?",
        "options": [
          "POP3.",
          "SNMP.",
          "ICMP.",
          "SMTP."
        ],
        "correctIndex": 3,
        "explanation": "SMTP sends email between servers. POP3 is for retrieving email from the server."
      },
      {
        "id": "exam3_q16",
        "text": "UDP is preferred for:",
        "options": [
          "File transfers needing guaranteed delivery.",
          "Bank transactions.",
          "Real-time apps like VoIP or video streaming.",
          "Email."
        ],
        "correctIndex": 2,
        "explanation": "UDP is faster for real-time apps (VoIP, streaming) because it doesn\u2019t wait for ACKs."
      },
      {
        "id": "exam3_q17",
        "text": "Why is UDP generally faster than TCP?",
        "options": [
          "It maintains session information, so packets are prioritized.",
          "It guarantees delivery of every packet.",
          "It has lower overhead because it has no connection setup, no acknowledgments, and no congestion control.",
          "It monitors and tracks all active sessions for reliability."
        ],
        "correctIndex": 2,
        "explanation": "UDP is connectionless and does not check delivery or congestion. TCP has extra overhead for reliability."
      },
      {
        "id": "exam3_q18",
        "text": "In packet-switched networks, data is:",
        "options": [
          "Sent through a dedicated circuit.",
          "Split into packets that may take different paths.",
          "Delivered as a continuous stream.",
          "Sent in fixed time slots."
        ],
        "correctIndex": 1,
        "explanation": "Data is split into packets that may take different routes; it\u2019s not a continuous stream or dedicated circuit."
      },
      {
        "id": "exam3_q19",
        "text": "What is the purpose of subnetting?",
        "options": [
          "Simplify hostname-to-IP translation.",
          "Increase cable speed.",
          "Split a large network into smaller segments to reduce broadcast traffic.",
          "Remove the need for routers."
        ],
        "correctIndex": 2,
        "explanation": "Splitting a network into smaller segments reduces broadcast traffic and improves efficiency."
      },
      {
        "id": "exam3_q20",
        "text": "What is the correct DHCP message sequence (DORA)?",
        "options": [
          "Discover \u2192 Offer \u2192 Request \u2192 Acknowledge.",
          "Offer \u2192 Discover \u2192 Request \u2192 Acknowledge.",
          "Discover \u2192 Request \u2192 Offer \u2192 Acknowledge.",
          "Request \u2192 Discover \u2192 Offer \u2192 Acknowledge."
        ],
        "correctIndex": 0,
        "explanation": "The standard DHCP message order: Discover \u2192 Offer \u2192 Request \u2192 Acknowledge."
      },
      {
        "id": "exam3_q21",
        "text": "How does a switch decide where to send a frame?",
        "options": [
          "Check MAC address table for destination MAC.",
          "Send to all ports.",
          "Check IP address.",
          "Use a routing table."
        ],
        "correctIndex": 0,
        "explanation": "Switch checks its MAC table to send the frame to the correct port."
      },
      {
        "id": "exam3_q22",
        "text": "Simplex, half-duplex, full-duplex means:",
        "options": [
          "Half-duplex allows simultaneous communication.",
          "Simplex = one-way, Half-duplex = two-way but not at same time, Full-duplex = two-way at same time.",
          "Full-duplex is one-way.",
          "Simplex is two-way."
        ],
        "correctIndex": 1,
        "explanation": "Simplex = one-way, Half-duplex = two-way not at same time, Full-duplex = two-way at same time."
      },
      {
        "id": "exam3_q23",
        "text": "What is the role of a subnet mask when a host decides where to forward a packet?",
        "options": [
          "Decide which DNS server to use.",
          "Divide IP into network/host to know if the destination is local or should go to default gateway.",
          "Filter bad traffic.",
          "Divide switches into VLANs."
        ],
        "correctIndex": 1,
        "explanation": "Host uses subnet mask to know if destination IP is local or needs to go to default gateway (exit out of LAN)."
      },
      {
        "id": "exam3_q24",
        "text": "What is the main function of the network layer?",
        "options": [
          "Multiplexing.",
          "Framing and MAC addressing.",
          "Assign port numbers.",
          "Logical addressing and routing packets."
        ],
        "correctIndex": 3,
        "explanation": "Layer 3 handles IP addressing and routing, not ports (Layer 4) or framing (Layer 2)."
      },
      {
        "id": "exam3_q25",
        "text": "What information does HTTP User-Agent send?",
        "options": [
          "Destination port.",
          "Network topology.",
          "Client software, OS, and device type.",
          "MAC addresses."
        ],
        "correctIndex": 2,
        "explanation": "It tells the server what software, OS, and device the client uses."
      },
      {
        "id": "exam3_q26",
        "text": "TCP sequence numbers are used to:",
        "options": [
          "Control transmission speed.",
          "Check checksums.",
          "Ensure packets arrive in order and detect missing packets.",
          "Establish connections."
        ],
        "correctIndex": 2,
        "explanation": "Ensure packets arrive in order and detect lost packets."
      },
      {
        "id": "exam3_q27",
        "text": "TCP flow control is used to:",
        "options": [
          "Assign ports.",
          "Monitor stats.",
          "Choose routes.",
          "Stop the sender from sending too fast for the receiver."
        ],
        "correctIndex": 3,
        "explanation": "Prevents the sender from overwhelming the receiver."
      },
      {
        "id": "exam3_q28",
        "text": "At Transport layer, destination port numbers identify:",
        "options": [
          "Physical interface.",
          "Destination MAC.",
          "Application or service.",
          "Routing path."
        ],
        "correctIndex": 2,
        "explanation": "Ports identify the application/service (e.g., HTTP = 80)."
      },
      {
        "id": "exam3_q29",
        "text": "TCP three-way handshake is for:",
        "options": [
          "Assigning IP.",
          "Resolving domain names.",
          "Making a reliable connection.",
          "Sending diagnostic info."
        ],
        "correctIndex": 2,
        "explanation": "Three-way handshake establishes a reliable connection before sending data."
      },
      {
        "id": "exam3_q30",
        "text": "ARP is used to:",
        "options": [
          "Assign IP.",
          "Translate domain names.",
          "Test connectivity.",
          "Map IP to MAC addresses."
        ],
        "correctIndex": 3,
        "explanation": "ARP maps an IP address to a MAC address for Layer 2 delivery."
      },
      {
        "id": "exam3_q31",
        "text": "Switch MAC table is used to:",
        "options": [
          "Map MAC addresses to switch ports.",
          "Track TCP sessions.",
          "Store routes.",
          "Associate IPs with VLANs."
        ],
        "correctIndex": 0,
        "explanation": "Switch uses MAC table to know which port a MAC address is on."
      },
      {
        "id": "exam3_q32",
        "text": "VLANs are used to:",
        "options": [
          "Logically segment networks into broadcast domains.",
          "Encrypt traffic.",
          "Physically separate switches.",
          "Automatically route between subnets."
        ],
        "correctIndex": 0,
        "explanation": "VLAN divides a network into logical broadcast domains, not encryption."
      },
      {
        "id": "exam3_q33",
        "text": "How does a router choose the path?",
        "options": [
          "Broadcast packets.",
          "Check the routing table.",
          "Check MAC addresses.",
          "Randomly forward."
        ],
        "correctIndex": 1,
        "explanation": "Routers consult routing table to decide the next hop."
      },
      {
        "id": "exam3_q34",
        "text": "OSPF metric is based on:",
        "options": [
          "Hop count.",
          "TTL.",
          "Cost (bandwidth).",
          "Policy."
        ],
        "correctIndex": 2,
        "explanation": "OSPF chooses path based on cost (bandwidth), not TTL or hop count alone."
      },
      {
        "id": "exam3_q35",
        "text": "SSID is:",
        "options": [
          "Frequency identifier.",
          "MAC address.",
          "Wireless network name broadcast by AP.",
          "Single-device ID."
        ],
        "correctIndex": 2,
        "explanation": "SSID is the wireless network name broadcast by AP."
      },
      {
        "id": "exam3_q36",
        "text": "Host A (192.168.1.2/24) pings Host B (192.168.2.2/24) in the same VLAN. What happens?",
        "options": [
          "Ping succeeds because VLAN forwards all frames.",
          "Ping fails because hosts are in different subnets and routing is needed.",
          "Ping succeeds after ARP resolves MAC across subnets.",
          "Ping succeeds because hosts are in the same subnets and routing is not needed."
        ],
        "correctIndex": 1,
        "explanation": "Hosts are in different subnets \u2192 Layer 3 routing is needed. Switch/VLAN alone doesn\u2019t help."
      },
      {
        "id": "exam3_q37",
        "text": "Which cloud model allows using both public and private resources?",
        "options": [
          "Public cloud only.",
          "Private cloud only.",
          "Hybrid cloud.",
          "Community cloud."
        ],
        "correctIndex": 2,
        "explanation": "Hybrid cloud uses both private and public resources."
      },
      {
        "id": "exam3_q38",
        "text": "Which attack impacts data integrity?",
        "options": [
          "Stealing passwords.",
          "Copying data out.",
          "Stopping service.",
          "Changing or corrupting data."
        ],
        "correctIndex": 3,
        "explanation": "Changing or corrupting data affects integrity. Stealing or copying data affects confidentiality, not integrity."
      },
      {
        "id": "exam3_q39",
        "text": "Evil Twin attack is:",
        "options": [
          "Spoofing MAC on switch.",
          "Flooding with SYN packets.",
          "A fake wireless access point pretending to be real.",
          "Listening to wired traffic."
        ],
        "correctIndex": 2,
        "explanation": "Fake AP tricks clients into connecting."
      },
      {
        "id": "exam3_q40",
        "text": "Main goal of Man-in-the-Middle attack:",
        "options": [
          "Deny service.",
          "Flooding with SYN packets.",
          "A fake wireless AP pretending to be real.",
          "Secretly intercept or change communication."
        ],
        "correctIndex": 3,
        "explanation": "Attacker secretly intercepts or changes communication."
      }
    ]
  }
]
;
