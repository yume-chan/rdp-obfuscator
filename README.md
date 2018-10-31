# rdp-obfuscator

At my workplace, an intranet firewall will detect RDP protocol and disconnect the server machine from Wi-Fi.

So I made this little proxy script to use GZip to hide RDP protocol.

## Usage

### Server side

``` shell
rdp-obfuscator server [--localPort 3391] [--rdpPort 3389]
```

arguments:

`localPort`: local listening port (Default: 3391)
`rdpPort`: local RDP server port (Default: 3389)

### Client side

``` shell
rdp-obfuscator client --remoteAddress x.x.x.x [--localPort 3390] [--remotePort 3391]
```

arguments:

`remoteAddress`: remote IP address
`localPort`: local listening port (Default: 3390)
`remotePort`: remote port (Default: 3391)

#### Disable RDP over UDP

This script only proxy TCP connection, RDP client will try UDP by default.

1. Open `regedit.exe`
2. Navigate to `Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows NT\Terminal Services\Client`
3. Add a DWORD value named `fClientDisableUDP` and set to `1`

#### Connect

1. Open `mstsc.exe`
2. Connect to `localhost:3390` (change the port to your client listening port)

## TODO:

* [ ] Add hole punching capability!
