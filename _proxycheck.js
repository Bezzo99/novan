export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const params = url.searchParams;

    if (path === "/check") {
      return await handleCheck(params);
    }

    return new Response(generateHTML(), {
      headers: { "Content-Type": "text/html" },
    });
  }
};

async function handleCheck(params) {
  const ipPort = params.get("ip");

  if (!ipPort) {
    return new Response("Parameter 'ip' diperlukan dalam format ip:port", { status: 400 });
  }

  const [ip, port] = ipPort.split(":");
  if (!ip || !port) {
    return new Response("Format IP:PORT tidak valid", { status: 400 });
  }

  const apiUrl = `https://p01--boiling-frame--kw6dd7bjv2nr.code.run/check?ip=${ip}&port=${port}&host=speed.cloudflare.com&tls=true`;

  try {
    const startTime = Date.now();
    const apiResponse = await fetch(apiUrl);
    const endTime = Date.now();
    let latency = endTime - startTime;
    latency = Math.round(latency / 150) + ".ms";

    const result = await apiResponse.json();
    
    const flags = {
      "AD": "🇦🇩", "AE": "🇦🇪", "AF": "🇦🇫", "AG": "🇦🇬", "AI": "🇦🇮", "AL": "🇦🇱", "AM": "🇦🇲", "AO": "🇦🇴",
      "AR": "🇦🇷", "AT": "🇦🇹", "AU": "🇦🇺", "AW": "🇦🇼", "AZ": "🇦🇿", "BA": "🇧🇦", "BB": "🇧🇧", "BD": "🇧🇩",
      "BE": "🇧🇪", "BF": "🇧🇫", "BG": "🇧🇬", "BH": "🇧🇭", "BI": "🇧🇮", "BJ": "🇧🇯", "BN": "🇧🇳", "BO": "🇧🇴",
      "BR": "🇧🇷", "BS": "🇧🇸", "BT": "🇧🇹", "BW": "🇧🇼", "BY": "🇧🇾", "BZ": "🇧🇿", "CA": "🇨🇦", "CD": "🇨🇩",
      "CF": "🇨🇫", "CG": "🇨🇬", "CH": "🇨🇭", "CI": "🇨🇮", "CL": "🇨🇱", "CM": "🇨🇲", "CN": "🇨🇳", "CO": "🇨🇴",
      "CR": "🇨🇷", "CU": "🇨🇺", "CV": "🇨🇻", "CY": "🇨🇾", "CZ": "🇨🇿", "DE": "🇩🇪", "DJ": "🇩🇯", "DK": "🇩🇰",
      "DM": "🇩🇲", "DO": "🇩🇴", "DZ": "🇩🇿", "EC": "🇪🇨", "EE": "🇪🇪", "EG": "🇪🇬", "ER": "🇪🇷", "ES": "🇪🇸",
      "ET": "🇪🇹", "FI": "🇫🇮", "FJ": "🇫🇯", "FM": "🇫🇲", "FR": "🇫🇷", "GA": "🇬🇦", "GB": "🇬🇧", "GD": "🇬🇩",
      "GE": "🇬🇪", "GH": "🇬🇭", "GM": "🇬🇲", "GN": "🇬🇳", "GQ": "🇬🇶", "GR": "🇬🇷", "GT": "🇬🇹", "GW": "🇬🇼",
      "GY": "🇬🇾", "HN": "🇭🇳", "HR": "🇭🇷", "HT": "🇭🇹", "HU": "🇭🇺", "ID": "🇮🇩", "IE": "🇮🇪", "IL": "🇮🇱",
      "IN": "🇮🇳", "IQ": "🇮🇶", "IR": "🇮🇷", "IS": "🇮🇸", "IT": "🇮🇹", "JM": "🇯🇲", "JO": "🇯🇴", "JP": "🇯🇵",
      "KE": "🇰🇪", "KG": "🇰🇬", "KH": "🇰🇭", "KI": "🇰🇮", "KM": "🇰🇲", "KN": "🇰🇳", "KP": "🇰🇵", "KR": "🇰🇷",
      "KW": "🇰🇼", "KZ": "🇰🇿", "LA": "🇱🇦", "LB": "🇱🇧", "LC": "🇱🇨", "LI": "🇱🇮", "LK": "🇱🇰", "LR": "🇱🇷",
      "LS": "🇱🇸", "LT": "🇱🇹", "LU": "🇱🇺", "LV": "🇱🇻", "LY": "🇱🇾", "MA": "🇲🇦", "MC": "🇲🇨", "MD": "🇲🇩",
      "ME": "🇲🇪", "MG": "🇲🇬", "MH": "🇲🇭", "MK": "🇲🇰", "ML": "🇲🇱", "MM": "🇲🇲", "MN": "🇲🇳", "MR": "🇲🇷",
      "MT": "🇲🇹", "MU": "🇲🇺", "MV": "🇲🇻", "MW": "🇲🇼", "MX": "🇲🇽", "MY": "🇲🇾", "MZ": "🇲🇿", "NA": "🇳🇦",
      "NE": "🇳🇪", "NG": "🇳🇬", "NI": "🇳🇮", "NL": "🇳🇱", "NO": "🇳🇴", "NP": "🇳🇵", "NR": "🇳🇷", "NZ": "🇳🇿",
      "OM": "🇴🇲", "PA": "🇵🇦", "PE": "🇵🇪", "PG": "🇵🇬", "PH": "🇵🇭", "PK": "🇵🇰", "PL": "🇵🇱", "PT": "🇵🇹",
      "PW": "🇵🇼", "PY": "🇵🇾", "QA": "🇶🇦", "RO": "🇷🇴", "RU": "🇷🇺", "RW": "🇷🇼", "SA": "🇸🇦", "SB": "🇸🇧",
      "SC": "🇸🇨", "SD": "🇸🇩", "SE": "🇸🇪", "SG": "🇸🇬", "SI": "🇸🇮", "SK": "🇸🇰", "SL": "🇸🇱", "SM": "🇸🇲",
      "SN": "🇸🇳", "SO": "🇸🇴", "SR": "🇸🇷", "SS": "🇸🇸", "ST": "🇸🇹", "SV": "🇸🇻", "SY": "🇸🇾", "SZ": "🇸🇿",
      "TD": "🇹🇩", "TG": "🇹🇬", "TH": "🇹🇭", "TJ": "🇹🇯", "TL": "🇹🇱", "TM": "🇹🇲", "TN": "🇹🇳", "TO": "🇹🇴",
      "TR": "🇹🇷", "TT": "🇹🇹", "TV": "🇹🇻", "TZ": "🇹🇿", "UA": "🇺🇦", "UG": "🇺🇬", "US": "🇺🇸", "UY": "🇺🇾",
      "UZ": "🇺🇿", "VA": "🇻🇦", "VC": "🇻🇨", "VE": "🇻🇪", "VN": "🇻🇳", "VU": "🇻🇺", "WF": "🇼🇫", "WS": "🇼🇸",
      "YE": "🇾🇪", "ZA": "🇿🇦", "ZM": "🇿🇲", "ZW": "🇿🇼"
    };

    const countryCode = result.country?.split(" ")[0] || "Unknown";
    const countryFlag = flags[countryCode] || "🏳️";

    const responseData = {
      isp: result.asOrganization,
      asn: result.asn,
      city: result.city,
      country: `${countryCode} ${countryFlag}`,
      ip: result.ip,
      port: port,
      origin: result.origin,
      vpn: result.proxyip,
      warp: result.warp,
      status: result.proxyip ? "ACTIVE ✅" : "DEAD ❌",
      delay: latency
    };

    // Simpan data ke localStorage dengan nama "proxyData"
    const jsonData = JSON.stringify(responseData, null, 2);
    
    return new Response(jsonData, {
      headers: { "Content-Type": "application/json" }
    });
    
    

  } catch (error) {
    const errorData = {
      isp: "Unknown",
      asn: "Unknown",
      city: "Unknown",
      country: "Unknown",
      ip: ip,
      port: port,
      origin: "Unknown",
      vpn: "Unknown",
      warp: "Unknown",
      status: "DEAD ❌",
      delay: "0.ms"
    };
    return new Response(JSON.stringify(errorData, null, 2), {
      headers: { "Content-Type": "application/json" }
    });
  }
}

function generateHTML() {
  return `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proxy Checker</title>
    <meta property="og:image" content="https://novan.life/Gmbr/background.jpg"> <!-- Ganti dengan URL gambar yang sesuai -->
    <meta property="og:url" content="https://novan.life/Gmbr/background.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta property="og:type" content="website">
    <meta name="twitter:image" content="https://novan.life/Gmbr/background.jpg"> <!-- Ganti dengan URL gambar yang sesuai -->
    <link href="https://novan.life/Gmbr/background.jpg" rel="icon" type="image/png">
    <style>
    body { font-family: Arial, sans-serif; text-align: center; }
       
  header, footer {
      background-color: #45a049;
      color: white;
      padding: 10px 0;
      text-align: center;
  }
  header h1, footer p {
      margin: 0;
  }
  .container {
      margin-top: 10px;
      margin-bottom: 10px;
      margin: 10px;
      padding: 10px;
  }
input[type="text"] { padding: 8px; width: 150px; margin-bottom: 15px; }
        button { padding: 8px 16px; background-color: #4CAF50; color: white; border: none; cursor: pointer; }
        button:hover { background-color: #45a049; }
        #loadinga { display: none; font-size: 18px; font-weight: bold; }
    
  table { margin: auto; border-collapse: collapse; width: 95%; max-width: 700px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #4CAF50; color: white; }
        td { padding: 8px 12px; }
        input[type="text"] { padding: 8px; width: 200px; margin-bottom: 10px; }
        button { padding: 8px 16px; background-color: #4CAF50; color: white; border: none; cursor: pointer; }
        button:hover { background-color: #45a049; }
        #loading { display: none; font-size: 18px; font-weight: bold; }
    
    @keyframes moveColors {
  100% {
    background-position: -200%; /* Mulai dari luar kiri */
  }
  0% {
    background-position: 200%; /* Bergerak ke kanan */
  }
}

  #loading {
  display: none; font-size: 20px; font-weight: bold;
  
  background: linear-gradient(90deg, red, orange, yellow, green, blue, purple);
  background-size: 200%;
  color: transparent;
  -webkit-background-clip: text;
  animation: moveColors 5s linear infinite;
}
  
    </style>
</head>
<body>
<header>
<h1>Proxy Checker</h1>
</header>
<div class="container">
    <input type="text" id="ipInput" placeholder="Input IP:Port(192.168.1.1:443)" />
    <button onclick="checkProxy()">Cek</button>
    <p id="loading">Loading...</p>
    <table id="resultTable">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>ISP</td><td>-</td></tr>
          <tr><td>ASN</td><td>-</td></tr>
          <tr><td>City</td><td>-</td></tr>
          <tr><td>Country</td><td>-</td></tr>
          <tr><td>IP</td><td>-</td></tr>
          <tr><td>Port</td><td>-</td></tr>
          <tr><td>Origin</td><td>-</td></tr>
          <tr><td>VPN</td><td>-</td></tr>
          <tr><td>WARP</td><td>-</td></tr>
          <tr><td>Status</td><td>-</td></tr>
          <tr><td>Delay</td><td>-</td></tr>
        </tbody>
    </table>
    </div>
    <footer>
    <p>&copy; 2025 Proxy Checker. All rights reserved.</p>
</footer>
    <script>
        // Saat halaman dimuat, periksa jika ada data di localStorage
        window.onload = function() {
            const storedData = localStorage.getItem("proxyData");
            if (storedData) {
                const data = JSON.parse(storedData);
                updateTable(data);
            }
        };

        async function checkProxy() {
            const ipPort = document.getElementById("ipInput").value;
            if (!ipPort) {
                alert("Masukkan IP:Port terlebih dahulu!");
                return;
            }

            document.getElementById("loading").style.display = "block";  // Menampilkan loading

            const response = await fetch(\`/check?ip=\${encodeURIComponent(ipPort)}\`);
            const data = await response.json();

            // Simpan data ke localStorage
            localStorage.setItem("proxyData", JSON.stringify(data));

            updateTable(data);
            document.getElementById("loading").style.display = "none";  // Menyembunyikan loading
        }

        function updateTable(data) {
            const table = document.getElementById("resultTable");
            const tbody = table.querySelector("tbody");

            tbody.querySelectorAll("tr").forEach((row) => {
                const key = row.querySelector("td").textContent;
                const dataKey = key.toLowerCase();

                if (data[dataKey]) {
                    row.querySelectorAll("td")[1].textContent = data[dataKey] || "-";
                }
            });
        }
    </script>
</body>
</html>`;
}
