#!/usr/bin/env python3
import http.server
import socket
import socketserver
import os
import sys

PORT = 8080

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)
    local_ip = get_local_ip()

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("=" * 60)
        print("  🌟 旅遊行程網頁伺服器已啟動！")
        print(f"  💻 電腦端本機瀏覽:  http://localhost:{PORT}")
        print(f"  📱 手機端同Wi-Fi瀏覽: http://{local_ip}:{PORT}")
        print("=" * 60)
        print("按 Ctrl+C 可停止伺服器。")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n伺服器已停止。")
            sys.exit(0)
