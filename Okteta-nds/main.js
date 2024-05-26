/*  Based on the info available from GBATEKS, extracted from no$gba v3.05   */

function init() {

    var enumCapacity = {
        "16MB" : 7,
        "32MB" : 8,
        "64MB" : 9,
        "128MB" : 10,
        "256MB" : 11,
        "512MB" : 12
    }

    var enumRegions = {
        "Worldwide" : 0x00,
        "China" : 0x80,
        "Korea" : 0x40
    };

    var CartridgeData = struct({
        "Game Title" : string("ascii").set({maxCharCount : 12}),
        "Game Code" : array(char(), 4),
        "Maker Code" : array(char(), 2),
        "Unit Code" : uint8(),

        "Encryption Seed" : uint8(),
        "Device Capacity" : enumeration("Capacity", uint8(), enumCapacity),

        "Reserved" : array(uint8(), 8),
    
        "Region" : enumeration("Region", uint8(), enumRegions),
        "Rom Version" : uint8(),
        "Auto Start" : enumeration("Mode", uint8(), {"Default" : 0, "Quickstart" : 4})
    })

    var ContentsData = struct({
        "ARM9 Data" : struct({
            "ROM Offset" : uint32(),
            "Entry Address" : uint32(),
            "RAM Address" : uint32(),
            "Size" : uint32()
        }),

        "ARM7 Data" : struct({
            "ROM Offset" : uint32(),
            "Entry Address" : uint32(),
            "RAM Address" : uint32(),
            "Size" : uint32()
        }),

        "File-Name Table Offset" : uint32(),
        "File-Name Table Size" : uint32(),

        "FAT Offset" : uint32(),
        "FAT Size" : uint32(),

        "Overlays" : struct({
            "File ARM9 Offset" : uint32(),
            "File ARM9 Size" : uint32(),
    
            "File ARM7 Offset" : uint32(), 
            "File ARM7 Size" : uint32()
        }),

        "0x40001A4" : struct({
            "Normal Port" : uint32(),
            "KEY1 Port" : uint32(),
        }),

        "Icon/Title Offset" : uint32(),
    })

    var SecureAreaData = struct({
        "Secure Area Checksum" : uint16(),
        "Secure Area Delay" : enumeration("Delay", uint16(), {"10ms" : 0x051E, "26ms" : 0x0D7E}),

        "Autoload List Hook" : struct({
            "ARM9 RAM Address" : uint32(),
            "ARM7 RAM Address" : uint32()
        }),

        "Secure Area Disable" : array(uint8(), 8)
    })

    var MiscData = struct({
        "Total used ROM" : uint32(),
        "Header Size" : uint32(), /* typically = 0x4000 */

        "Unkown" : struct({
            "Unknown" : uint32(),
            "DSI Only" : array(uint32(), 2)
        }),

        "NAND" : struct({
            "End of ROM" : uint16(),
            "Start of RW" : uint16()
        }),

        "Reserved" : struct({
            "Reserved" : array(uint8(), 0x18),
            "Reserved?" : array(char(), 16),
        }),

        "Nintendo Logo" : array(uint8(), 0x9C),
        "Nintendo Logo Checksum" : uint16(),
        "Header Checksum" : uint16(),

        "Debug Info" : struct({
            "Offset" : uint32(),
            "Size" : uint32(),
            "RAM address" : uint32()
        })
        
    })

    var header  = struct({
        "Cartridge Info" : CartridgeData,
        "Contents Data" : ContentsData,
        "Secure Area" : SecureAreaData,
        "Miscellaneous" : MiscData
    });
    
    return header;
}

