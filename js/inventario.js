const inventarioGuardado = JSON.parse(localStorage.getItem("inventarioCompleto"))
// --- Sección de LIBROS --
let libros

if (inventarioGuardado) {
    // Si hay datos anteriores, actualiza el inventario
    libros = inventarioGuardado.libros;
} else {
    // Si es la primera vez que se usa la pagina, se usan los datos del inventario original
    libros = [                                       
        {
            codigo: 1001,
            imagen: "",
            nombre: "We don't need roads: The Making of the Back to the Future Trilogy",
            autor: "Caseen Grines",
            precio:  21990,
            existencia: 1
        },
        {
            codigo: 1002,
            imagen: "",
            nombre: "Choque de Reyes",
            autor: "George R.R. Martin",
            precio: 14990,
            existencia: 2
        },
        {
            codigo: 1003,
            imagen: "",
            nombre: "Cochrane vs Cthulhu",
            autor: "Gilberto Villarroel", 
            precio: 17990,
            existencia: 3
        },
        {
            codigo: 1004,
            imagen: "",
            nombre: "Frontera Sur",
            autor: "Gillermo Parvex",
            precio: 15990,
            existencia: 4
        },
        {
            codigo: 1005,
            imagen: "",
            nombre: "El Misterio de los Estudios Kellerman",
            autor: "Ken Follet",
            precio: 11990,
            existencia: 5
        },
        {
            codigo: 1006,
            imagen: "",
            nombre: "La Materia Oscura",
            autor: "Phillip Pullman",
            precio: 17990,
            existencia: 6
        },
        {
            codigo: 1007,
            imagen: "",
            nombre: "Mónica la niña daltónica y Federico el perro psicodélico",
            autor: "",
            precio: 3990,
            existencia: 5
        },
        {
            codigo: 1008,
            imagen: "",
            nombre: "Orgullo y Prejuicio + Zombies",
            autor: "Gabriel Aiquel",
            precio: 9990,
            existencia: 1
        },
        {
            codigo: 1009,
            imagen: "",
            nombre: "Sobrenatural",
            autor: "Kiersten White",
            precio: 19990,
            existencia: 4
        },
        {
            codigo: 1010,
            imagen: "",
            nombre: "Soñar no cuesta nada",
            autor: "Alberto Montt",
            precio: 12990,
            existencia: 3
        },
        {
            codigo: 1011,
            imagen: "",
            nombre: "Viaje Alucinante II", 
            autor: "Isaac Asimov",
            precio: 10990,
            existencia: 2
        }, 
        {
            codigo: 1012,
            imagen: "",
            nombre: "Viajeros de la noche",
            autor: "George R.R. Martin",
            precio: 11990,
            existencia: 7
        },
        {
            codigo: 1013,
            imagen: "",
            nombre: "El cielo Enjaulado",
            autor: "Christine Leunens",
            precio: 6990,
            existencia: 8
        },
        {
            codigo: 1014,
            imagen: "",
            nombre: "Walt's Imagination",
            autor: "Doreen Rapaport",
            precio: 6990,
            existencia: 6
        }
    ];
}


// --- Sección de JUEGOS DE ROL ---
let juegosRol
if (inventarioGuardado) {
    juegosRol = inventarioGuardado.juegosRol;
} else {
    juegosRol = [
        {
            codigo: 2001,
            imagen: "",
            nombre: "Vampiro",
            autor: "WoD",
            precio:59990,
            existencia: 5
        },
        {
            codigo: 2002,
            imagen: "",
            nombre: "Hombre Lobo",
            autor: "Wod",
            precio: 59990,
            existencia: 2
        },
        {
            codigo: 2003,
            imagen: "",
            nombre: "D&D Manual del Master",
            autor: "WotC",
            precio: 65990,
            existencia: 3
        },
        {
            codigo: 2004,
            imagen: "",
            nombre: "D&D Manual del Jugador",
            autor: "WotC",
            precio: 65990,
            existencia: 6
        },
        {
            codigo: 2005,
            imagen: "",
            nombre: "D&D Las Tierras mas allá de Brujaluz",
            autor: "WotC",
            precio: 49990,
            existencia: 9
        },
        {
            codigo: 2006,
            imagen: "",
            nombre: "L5R",
            autor: "FFG",
            precio: 45990,
            existencia: 6
        },
        {
            codigo: 2007,
            imagen: "",
            nombre: "Cthulhu Confidencial",
            autor: "EDGE",
            precio: 39990,
            existencia: 2
        },
        {
            codigo: 2008,
            imagen: "",
            nombre: "7mar",
            autor: "NOSOLOROL",
            precio: 54990,
            existencia: 8
        },
        {
            codigo: 2009,
            imagen: "",
            nombre: "Alien",
            autor: "EDGE",
            precio: 52990,
            existencia: 2
        }, 
        {
            codigo: 2010,
            imagen: "",
            nombre: "Changeling",
            autor: "WoD",
            precio: 5990,
            existencia: 1
        },  
        {
            codigo: 2011,
            imagen: "",
            nombre: "Forbidden lands",
            autor: "NOSOLOROL",
            precio: 59990,
            existencia: 5
        }
    ];
}

// --- SECCIÓN JUEGOS DE MESA ---
let juegosMesa
if (inventarioGuardado) {
    juegosMesa = inventarioGuardado.juegosMesa;
} else {
    juegosMesa = [
        {
            codigo: 3001,
            imagen: "",
            nombre: "Catan",
            autor: "Devir",
            precio: 34990,
            existencia: 5
        },  
        {
            codigo: 3002,
            imagen: "",
            nombre: "Azul - Master Chocolatier",
            autor: "Next Move",
            precio: 44990,
            existencia: 5
        },  
        {
            codigo: 3003,
            imagen: "",
            nombre: "Munchkin",
            autor: "EDGE",
            precio: 25990,
            existencia: 5
        },  
        {
            codigo: 3004,
            imagen: "",
            nombre: "Monopoly",
            autor: "Hasbro",
            precio: 19900,
            existencia: 0
        },  
        {
            codigo: 3005,
            imagen: "",
            nombre: "Carcassone",
            autor: "Devir",
            precio: 29990,
            existencia: 5
        }
    ];
}

carroProductos = JSON.parse(localStorage.getItem("carroProductos")) || [];
productos = [...libros, ...juegosRol, ...juegosMesa];