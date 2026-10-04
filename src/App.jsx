import React, { useState, useMemo, useEffect } from "react";
import {
  Sun,
  Moon,
  Compass,
  Copy,
  Check,
  Trash2,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  RotateCcw,
  ArrowUpDown,
  X,
  FileText
} from "lucide-react";
import { IconLayers, IconSparkles, IconSliders, IconEye, IconBuilding, IconCode } from "./CustomIcons";

const DEFAULT_CONFIG = {
  proyecto: "01-Nombre Del Proyecto",
  subcarpeta: "vistas360",
  carpeta: "",
  zcSubcarpeta: "spinners",
  zcCarpeta: "zcs",
  extension: "webp",
  panoramaRotation: 90,
  cameraInitZoom: 1,
  cameraZoomMin: 0.25,
  cameraZoomMax: 5,
  cameraInitRotationX: 0,
  cameraInitRotationY: 0,
  minY: -30,
  maxY: 30,
  minX: -40,
  maxX: 40,
  jsonEstricto: false,
};

export default function App() {
  const [nombres, setNombres] = useState("");
  const [nombresReemplazoInput, setNombresReemplazoInput] = useState("");
  const [activarReemplazo, setActivarReemplazo] = useState(false);

  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [todosColapsados, setTodosColapsados] = useState(true);

  // Notificaciones de copiado JSON
  const [copiadoOrig, setCopiadoOrig] = useState(false);
  const [copiadoVert, setCopiadoVert] = useState(false);
  const [copiadoLado1, setCopiadoLado1] = useState(false);
  const [copiadoLado2, setCopiadoLado2] = useState(false);

  // Notificaciones de copiado Lista de Nombres
  const [copiadoNombresOrig, setCopiadoNombresOrig] = useState(false);
  const [copiadoNombresVert, setCopiadoNombresVert] = useState(false);
  const [copiadoNombresLado1, setCopiadoNombresLado1] = useState(false);
  const [copiadoNombresLado2, setCopiadoNombresLado2] = useState(false);

  // Parámetros Sección 4: Arriba / Abajo
  const [cantPisos, setCantPisos] = useState(1);
  const [pasoPisos, setPasoPisos] = useState(1);
  const [pisosAExcluir, setPisosAExcluir] = useState("");
  const [direccionPisos, setDireccionPisos] = useState("ambos"); // "ambos" | "arriba" | "abajo"

  // Parámetros Sección 5: Hacia un lado
  const [origenLado1, setOrigenLado1] = useState("01");
  const [destinoLado1, setDestinoLado1] = useState("03");
  const [incluirVertLado1, setIncluirVertLado1] = useState(false);

  // Parámetros Sección 6: Hacia el otro lado
  const [origenLado2, setOrigenLado2] = useState("04");
  const [destinoLado2, setDestinoLado2] = useState("02");
  const [incluirVertLado2, setIncluirVertLado2] = useState(false);

  // Navegación (Tabs)
  const [pantallaActiva, setPantallaActiva] = useState("vistas"); // "vistas" | "zonas"

  // Parámetros Sección 7: Zonas Comunes
  const [zcNombresInput, setZcNombresInput] = useState("");
  const [zcNombresReemplazoInput, setZcNombresReemplazoInput] = useState("");
  const [zcActivarReemplazo, setZcActivarReemplazo] = useState(false);

  const [zcCustomEdits, setZcCustomEdits] = useState({}); // Cambios manuales por id
  const [traduccionesMap, setTraduccionesMap] = useState({}); // Caché de traducciones
  const [copiadoZC, setCopiadoZC] = useState(false);
  const [copiadoNombresZC, setCopiadoNombresZC] = useState(false);
  const [zcColapsados, setZcColapsados] = useState(true);

  // Lista base parseada de Zonas Comunes en tiempo real
  const zcListaBase = useMemo(() => {
    return zcNombresInput
      .split(/[\n,]+/)
      .map((s) => s.trim().replace(/\.[^/.]+$/, ""))
      .filter(Boolean);
  }, [zcNombresInput]);

  // Lista parseada de reemplazos de Zonas Comunes
  const zcListaReemplazos = useMemo(() => {
    return zcNombresReemplazoInput
      .split(/[\n,]+/)
      .map((s) => s.trim().replace(/\.[^/.]+$/, ""))
      .filter(Boolean);
  }, [zcNombresReemplazoInput]);

  // Efecto para traducir nombres nuevos automáticamente
  useEffect(() => {
    zcListaBase.forEach(async (nombre) => {
      const nombreLimpio = nombre.replace(/_/g, " ");
      if (!traduccionesMap[nombreLimpio]) {
        try {
          const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(nombreLimpio)}&langpair=es|en`);
          const data = await res.json();
          if (data?.responseData?.translatedText) {
            setTraduccionesMap((prev) => ({
              ...prev,
              [nombreLimpio]: data.responseData.translatedText,
            }));
          }
        } catch (e) {
          console.error("Error al traducir:", e);
        }
      }
    });
  }, [zcListaBase]);

  // Lista reactiva de items de Zonas Comunes (con soporte de reemplazo)
  const zcItems = useMemo(() => {
    return zcListaBase.map((nombre, index) => {
      const id = `zc-${index}-${nombre}`;
      const claveOriginal = nombre.replace(/\s+/g, "");
      const nombreLimpio = nombre.replace(/_/g, " ");
      const title2EnAuto = traduccionesMap[nombreLimpio] || nombreLimpio;

      // Calcular clave final con reemplazo si está activo
      let claveFinal = claveOriginal;
      if (zcActivarReemplazo && index < zcListaReemplazos.length && zcListaReemplazos[index]) {
        claveFinal = zcListaReemplazos[index].replace(/\s+/g, "");
      }

      const custom = zcCustomEdits[id] || {};

      return {
        id,
        claveOriginal,
        clave: custom.clave !== undefined ? custom.clave : claveFinal,
        title1Es: custom.title1Es !== undefined ? custom.title1Es : "Zonas Comunes",
        title1En: custom.title1En !== undefined ? custom.title1En : "Amenities",
        title2Es: custom.title2Es !== undefined ? custom.title2Es : nombreLimpio,
        title2En: custom.title2En !== undefined ? custom.title2En : title2EnAuto,
        swiperImage: custom.swiperImage !== undefined ? custom.swiperImage : (custom.clave || claveFinal),
        url: custom.url,
        btnImage: custom.btnImage,
      };
    });
  }, [zcListaBase, zcActivarReemplazo, zcListaReemplazos, zcCustomEdits, traduccionesMap]);

  const zcActualizarItem = (id, campo, valor) => {
    setZcCustomEdits((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [campo]: valor,
      },
    }));
  };

  const zcEliminarItem = (id) => {
    const itemTarget = zcItems.find(i => i.id === id);
    if (!itemTarget) return;
    const nuevasLineas = zcListaBase.filter(n => n.replace(/\s+/g, "") !== itemTarget.claveOriginal && n !== itemTarget.title2Es);
    setZcNombresInput(nuevasLineas.join("\n"));
  };

  const zcGenerarBloque = (item) => {
    const comma = config.jsonEstricto ? '' : ',';
    const wrap = (k, v) => config.jsonEstricto ? '"' + k + '": ' + v : k + ': ' + v;
    const str = (v) => '"' + v + '"';

    const lines = [];
    lines.push(str(item.clave) + ': {');
    lines.push('  ' + wrap('enabled', 'true') + ',');
    lines.push('  ' + wrap('btnImage', str(item.btnImage)) + ',');
    lines.push('  ' + wrap('title1', '["<p>' + item.title1Es + '</p>", "<p>' + item.title1En + '</p>"]') + ',');
    lines.push('  ' + wrap('title2', '['));
    lines.push('    "<h2>' + item.title2Es + '</h2>",');
    lines.push('    "<h2>' + item.title2En + '</h2>",');
    lines.push('  ],');
    lines.push('  ' + wrap('subtitle', '["", ""]') + ',');
    lines.push('  ' + wrap('swiper', '{'));
    lines.push('    ' + wrap('enabled', 'true') + ',');
    lines.push('    ' + wrap('onClick', str('gallery')) + ',');
    lines.push('    ' + wrap('imgObjectFit', str('cover')) + ',');
    lines.push('    ' + wrap('height', str('200px')) + ',');
    lines.push('    ' + wrap('width', str('100%')) + ',');
    lines.push('    ' + wrap('slidesPerView', '1') + ',');
    lines.push('    ' + wrap('pagination', 'true') + ',');
    lines.push('    ' + wrap('images', '[' + str(item.swiperImage) + ']') + ',');
    lines.push('  },');
    lines.push('  ' + wrap('description', '["", ""]') + ',');
    lines.push('  ' + wrap('vista360', '['));
    lines.push('    {');
    lines.push('      ' + wrap('enabled', 'true') + ',');
    lines.push('      ' + wrap('url', str(item.url)) + ',');
    lines.push('      ' + wrap('title', str('Vista exterior sur')) + ',');
    lines.push('      ' + wrap('thumb', str('')) + ',');
    lines.push('      ' + wrap('panoramaRotation', Number(config.panoramaRotation)) + ',');
    lines.push('      ' + wrap('cameraInitZoom', Number(config.cameraInitZoom)) + ',');
    lines.push('      ' + wrap('cameraZoomMinMax', '[' + Number(config.cameraZoomMin) + ', ' + Number(config.cameraZoomMax) + ']') + ',');
    lines.push('      ' + wrap('cameraInitRotation', '[' + Number(config.cameraInitRotationX) + ', ' + Number(config.cameraInitRotationY) + ']') + ',');
    lines.push('      ' + wrap('viewRestrictions', '{'));
    lines.push('        ' + wrap('minY', Number(config.minY)) + ',');
    lines.push('        ' + wrap('maxY', Number(config.maxY)) + ',');
    lines.push('        ' + wrap('minX', Number(config.minX)) + ',');
    lines.push('        ' + wrap('maxX', Number(config.maxX)) + comma);
    lines.push('      }');
    lines.push('    }' + comma);
    lines.push('  ],');
    lines.push('  ' + wrap('tour360', '['));
    lines.push('    {');
    lines.push('      ' + wrap('enabled', 'false') + ',');
    lines.push('      ' + wrap('label', '["<h2>Pano 1</h2>", "<h2>Pano 1</h2>"]') + ',');
    lines.push('      ' + wrap('url', str('')) + ',');
    lines.push('    }' + comma);
    lines.push('  ],');
    lines.push('},');

    return lines.join('\n');
  };

  const zcBloquesGenerados = useMemo(() => {
    return zcItems.map((item) => {
      const sub = config.zcSubcarpeta?.trim() ? `${config.zcSubcarpeta.trim()}/` : "";
      const folder = config.zcCarpeta?.trim() ? `${config.zcCarpeta.trim()}/` : "";

      // La URL del asset se basa en la clave original para conservar el recurso físico
      const assetKey = item.claveOriginal || item.clave;
      const computedUrl = `{origenAssets}/images/${config.proyecto}/${sub}${folder}${assetKey}.${config.extension}`;
      const computedBtnImage = `{origenAssets}/images/${config.proyecto}/${sub}${folder}jpg/${assetKey}.jpeg`;

      const currentUrl = item.url !== undefined ? item.url : computedUrl;
      const currentBtnImage = item.btnImage !== undefined ? item.btnImage : computedBtnImage;

      const itemWithComputed = { ...item, url: currentUrl, btnImage: currentBtnImage };

      return {
        nombre: itemWithComputed.clave,
        item: itemWithComputed,
        contenido: zcGenerarBloque(itemWithComputed),
      };
    });
  }, [zcItems, config]);

  const actualizarConfig = (campo, valor) => {
    setConfig((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const listaBase = useMemo(() => {
    return nombres
      .split(/[\n,]+/)
      .map((item) => item.trim().replace(/\.[^/.]+$/, ""))
      .filter(Boolean);
  }, [nombres]);

  const listaReemplazos = useMemo(() => {
    return nombresReemplazoInput
      .split(/[\n,]+/)
      .map((item) => item.trim().replace(/\.[^/.]+$/, ""))
      .filter(Boolean);
  }, [nombresReemplazoInput]);

  const parsearNombre = (item) => {
    const match = item.match(/^(.*?-\s*)(\d+)(.*)$/) || item.match(/^(.*?)(\d+)(.*)$/);
    if (!match) return null;
    const [, prefix, numStr, suffix] = match;
    return { prefix, numStr, numBase: parseInt(numStr, 10), len: numStr.length, suffix };
  };

  const generarBloqueTexto = (nombreClave, nombreUrl = nombreClave) => {
    const subfolderSegment = config.subcarpeta?.trim() ? `${config.subcarpeta.trim()}/` : "";
    const folderSegment = config.carpeta?.trim() ? `${config.carpeta.trim()}/` : "";
    const urlAsset = `{origenAssets}/images/${config.proyecto}/${subfolderSegment}${folderSegment}${nombreUrl}.${config.extension}`;

    if (config.jsonEstricto) {
      return `"${nombreClave}": [
  {
    "enabled": true,
    "title": "",
    "url": "${urlAsset}",
    "thumb": "",
    "panoramaRotation": ${Number(config.panoramaRotation)},
    "cameraInitZoom": ${Number(config.cameraInitZoom)},
    "cameraZoomMinMax": [${Number(config.cameraZoomMin)}, ${Number(config.cameraZoomMax)}],
    "cameraInitRotation": [${Number(config.cameraInitRotationX)}, ${Number(config.cameraInitRotationY)}],
    "viewRestrictions": {
      "minY": ${Number(config.minY)},
      "maxY": ${Number(config.maxY)},
      "minX": ${Number(config.minX)},
      "maxX": ${Number(config.maxX)}
    }
  }
],`;
    }
    return `"${nombreClave}": [
  {
    enabled: true,
    title: "",
    url: "${urlAsset}",
    thumb: "",
    panoramaRotation: ${Number(config.panoramaRotation)},
    cameraInitZoom: ${Number(config.cameraInitZoom)},
    cameraZoomMinMax: [${Number(config.cameraZoomMin)}, ${Number(config.cameraZoomMax)}],
    cameraInitRotation: [${Number(config.cameraInitRotationX)}, ${Number(config.cameraInitRotationY)}],
    viewRestrictions: {
      minY: ${Number(config.minY)},
      maxY: ${Number(config.maxY)},
      minX: ${Number(config.minX)},
      maxX: ${Number(config.maxX)},
    },
  },
],`;
  };

  const reemplazarTerminacion = (item, origen, destino) => {
    const parsed = parsearNombre(item);
    if (!parsed || !origen || !destino) return null;

    const { prefix, numStr, suffix } = parsed;

    if (numStr.endsWith(origen)) {
      const basePrefix = numStr.substring(0, numStr.length - origen.length);
      const nuevoNumeroStr = `${basePrefix}${destino}`;
      const claveNueva = `${prefix}${nuevoNumeroStr}${suffix}`;

      return {
        nombreClave: claveNueva,
        nombreBaseOriginal: item,
      };
    }

    return null;
  };

  const obtenerNombreFinal = (nombreOriginal, index) => {
    if (activarReemplazo && index < listaReemplazos.length && listaReemplazos[index]) {
      return listaReemplazos[index];
    }
    return nombreOriginal;
  };

  const bloquesOriginales = useMemo(() => {
    return listaBase.map((nombreOriginal, index) => {
      const nombreClaveFinal = obtenerNombreFinal(nombreOriginal, index);
      return {
        nombre: nombreClaveFinal,
        contenido: generarBloqueTexto(nombreClaveFinal, nombreOriginal),
      };
    });
  }, [listaBase, activarReemplazo, listaReemplazos, config]);

  const bloquesVerticales = useMemo(() => {
    const resultados = [];
    const clavesOriginales = new Set(listaBase);
    const pisosOmitidos = pisosAExcluir.split(',').map(s => s.trim()).filter(Boolean);

    const esPisoExcluido = (numeroCalculado) => {
      if (pisosOmitidos.length === 0) return false;
      const numStr = String(numeroCalculado);
      const piso = numStr.length > 2 ? numStr.slice(0, -2) : numStr;
      return pisosOmitidos.includes(piso);
    };

    listaBase.forEach((item) => {
      const parsed = parsearNombre(item);
      if (!parsed) return;
      const { prefix, numBase, len, suffix } = parsed;

      for (let i = 1; i <= cantPisos; i++) {
        const incremento = i * Number(pasoPisos) * 100;

        if (direccionPisos === "ambos" || direccionPisos === "abajo") {
          const numAbajo = numBase - incremento;
          if (numAbajo > 0 && !esPisoExcluido(numAbajo)) {
            const lenAbajo = String(numAbajo).length > len ? String(numAbajo).length : len;
            const targetLen = numBase >= 1000 && numAbajo < 1000 ? String(numAbajo).length : lenAbajo;

            const clave = `${prefix}${String(numAbajo).padStart(targetLen, "0")}${suffix}`;
            if (!clavesOriginales.has(clave)) {
              resultados.push({ nombreClave: clave, nombreBaseOriginal: item });
            }
          }
        }

        if (direccionPisos === "ambos" || direccionPisos === "arriba") {
          const numArriba = numBase + incremento;
          if (!esPisoExcluido(numArriba)) {
            const targetLenArriba = Math.max(len, String(numArriba).length);
            const claveArriba = `${prefix}${String(numArriba).padStart(targetLenArriba, "0")}${suffix}`;
            if (!clavesOriginales.has(claveArriba)) {
              resultados.push({ nombreClave: claveArriba, nombreBaseOriginal: item });
            }
          }
        }
      }
    });

    return resultados.map((obj, index) => {
      const nombreClaveFinal = obtenerNombreFinal(obj.nombreClave, index);
      return {
        nombre: nombreClaveFinal,
        contenido: generarBloqueTexto(nombreClaveFinal, obj.nombreBaseOriginal),
      };
    });
  }, [listaBase, cantPisos, pasoPisos, pisosAExcluir, direccionPisos, activarReemplazo, listaReemplazos, config]);

  const bloquesLado1 = useMemo(() => {
    const resultados = [];
    let listaOrigen = [...listaBase];
    if (incluirVertLado1) {
      const clavesVert = bloquesVerticales.map((b) => b.nombre);
      const setUnico = new Set([...listaOrigen, ...clavesVert]);
      listaOrigen = Array.from(setUnico);
    }

    listaOrigen.forEach((item) => {
      const match = reemplazarTerminacion(item, origenLado1.trim(), destinoLado1.trim());
      if (match) {
        resultados.push(match);
      }
    });

    return resultados.map((obj, index) => {
      const nombreClaveFinal = obtenerNombreFinal(obj.nombreClave, index);
      return {
        nombre: nombreClaveFinal,
        contenido: generarBloqueTexto(nombreClaveFinal, obj.nombreBaseOriginal),
      };
    });
  }, [listaBase, bloquesVerticales, incluirVertLado1, origenLado1, destinoLado1, activarReemplazo, listaReemplazos, config]);

  const bloquesLado2 = useMemo(() => {
    const resultados = [];
    let listaOrigen = [...listaBase];
    if (incluirVertLado2) {
      const clavesVert = bloquesVerticales.map((b) => b.nombre);
      const setUnico = new Set([...listaOrigen, ...clavesVert]);
      listaOrigen = Array.from(setUnico);
    }

    listaOrigen.forEach((item) => {
      const match = reemplazarTerminacion(item, origenLado2.trim(), destinoLado2.trim());
      if (match) {
        resultados.push(match);
      }
    });

    return resultados.map((obj, index) => {
      const nombreClaveFinal = obtenerNombreFinal(obj.nombreClave, index);
      return {
        nombre: nombreClaveFinal,
        contenido: generarBloqueTexto(nombreClaveFinal, obj.nombreBaseOriginal),
      };
    });
  }, [listaBase, bloquesVerticales, incluirVertLado2, origenLado2, destinoLado2, activarReemplazo, listaReemplazos, config]);

  const copiarTexto = async (texto, setEstado) => {
    if (!texto) return;
    try {
      await navigator.clipboard.writeText(texto);
      setEstado(true);
      setTimeout(() => setEstado(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const [tema, setTema] = useState("dark");

  const alternarTema = () => {
    setTema((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Coincidencia para Vistas 360
  const coincidenciaEstado = useMemo(() => {
    const totalOriginales = listaBase.length;
    const totalNuevos = listaReemplazos.length;

    if (totalOriginales === 0 || totalNuevos === 0) {
      return { igual: false, mensaje: "Ingresa listas para comparar", tipo: "neutral" };
    }
    if (totalOriginales === totalNuevos) {
      return { igual: true, mensaje: `Coincidencia exacta (${totalOriginales})`, tipo: "success" };
    } else if (totalNuevos < totalOriginales) {
      const dif = totalOriginales - totalNuevos;
      return { igual: false, mensaje: `Faltan ${dif} nombre(s) (${totalNuevos}/${totalOriginales})`, tipo: "danger" };
    } else {
      const dif = totalNuevos - totalOriginales;
      return { igual: false, mensaje: `Sobran ${dif} nombre(s) (${totalNuevos}/${totalOriginales})`, tipo: "warning" };
    }
  }, [listaBase, listaReemplazos]);

  // Coincidencia para Zonas Comunes
  const zcCoincidenciaEstado = useMemo(() => {
    const totalOriginales = zcListaBase.length;
    const totalNuevos = zcListaReemplazos.length;

    if (totalOriginales === 0 || totalNuevos === 0) {
      return { igual: false, mensaje: "Ingresa listas para comparar", tipo: "neutral" };
    }
    if (totalOriginales === totalNuevos) {
      return { igual: true, mensaje: `Coincidencia exacta (${totalOriginales})`, tipo: "success" };
    } else if (totalNuevos < totalOriginales) {
      const dif = totalOriginales - totalNuevos;
      return { igual: false, mensaje: `Faltan ${dif} nombre(s) (${totalNuevos}/${totalOriginales})`, tipo: "danger" };
    } else {
      const dif = totalNuevos - totalOriginales;
      return { igual: false, mensaje: `Sobran ${dif} nombre(s) (${totalNuevos}/${totalOriginales})`, tipo: "warning" };
    }
  }, [zcListaBase, zcListaReemplazos]);

  return (
    <div className="app-container" data-theme={tema}>
      {/* APPLE HIG FROSTED HEADER */}
      <header className="main-header">
        <div className="brand-wrapper">
          <div>
            <h1 className="brand-title">Generador de Vistas 360°</h1>
            <p className="brand-subtitle">Estación Pro de Configuración JSON</p>
          </div>
        </div>

        <div className="flex-center-gap">
          <nav className="nav-tabs">
            <button
              className={`tab-btn ${pantallaActiva === 'vistas' ? 'active-vistas' : ''}`}
              onClick={() => setPantallaActiva('vistas')}
            >
              <IconEye size={15} />
              Vistas 360
            </button>
            <button
              className={`tab-btn ${pantallaActiva === 'zonas' ? 'active-zonas' : ''}`}
              onClick={() => setPantallaActiva('zonas')}
            >
              <IconBuilding size={15} />
              Zonas Comunes
            </button>
          </nav>

          <button
            className="btn btn-secondary btn-toggle-theme"
            onClick={alternarTema}
            title="Alternar Modo Claro / Oscuro"
          >
            {tema === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            <span>{tema === "dark" ? "Modo Claro" : "Modo Oscuro"}</span>
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL APPLE */}
      <main className="main-content">
        <div className="cards-grid">
          {/* PANEL IZQUIERDO */}
          {pantallaActiva === 'vistas' ? (
            <div className="flex-col-gap-20">
              <section className="dash-card">
                <div className="card-header-flex">
                  <div className="card-title-group">
                    <div>
                      <h3 className="card-title">1. Lista de Vistas (Assets)</h3>
                      <p className="card-desc">Nombre original de las imágenes físicas</p>
                    </div>
                  </div>
                  <span className="badge-count">
                    <IconLayers size={13} />
                    {listaBase.length}
                  </span>
                </div>

                <textarea
                  className="text-input-area input-area-md"
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  placeholder={`Ejemplo:\n1-301\n1-304\n2-501`}
                />

                <div className="flex-end-mt12">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setNombres("")}
                  >
                    <RotateCcw size={13} />
                    Limpiar Lista
                  </button>
                </div>
              </section>

              {/* REEMPLAZO MASIVO DE NOMBRES APPLE STYLE */}
              <section className="dash-card">
                <div className="card-header-flex">
                  <div className="card-title-group">
                    <div>
                      <h3 className="card-title">Reemplazo de Nombres</h3>
                      <p className="card-desc">Sustituye la clave principal conservando la URL</p>
                    </div>
                  </div>
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      className="toggle-checkbox"
                      checked={activarReemplazo}
                      onChange={(e) => setActivarReemplazo(e.target.checked)}
                    />
                    <span className={activarReemplazo ? 'toggle-text toggle-text-active' : 'toggle-text toggle-text-inactive'}>
                      {activarReemplazo ? 'Activo' : 'Inactivo'}
                    </span>
                  </label>
                </div>

                <textarea
                  className="text-input-area input-area-sm"
                  style={{ opacity: activarReemplazo ? 1 : 0.45 }}
                  value={nombresReemplazoInput}
                  onChange={(e) => setNombresReemplazoInput(e.target.value)}
                  placeholder={`Ejemplo nuevos nombres:\nVista-301-Final\nVista-304-Final\nVista-501-Final`}
                  disabled={!activarReemplazo}
                />

                <div className="flex-between-wrap-mt14">
                  <StatusPill estado={coincidenciaEstado} />

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setNombresReemplazoInput("")}
                  >
                    <RotateCcw size={13} />
                    Limpiar
                  </button>
                </div>
              </section>
            </div>
          ) : (
            <div className="flex-col-gap-20">
              <section className="dash-card">
                <div className="card-header-flex">
                  <div className="card-title-group">
                    <div>
                      <h3 className="card-title zone-header">Zonas Comunes</h3>
                      <p className="card-desc">Ingresa los nombres (generación en tiempo real)</p>
                    </div>
                  </div>
                  <span className="badge-count purple">
                    <IconBuilding size={13} />
                    {zcItems.length}
                  </span>
                </div>

                <textarea
                  className="text-input-area purple-focus input-area-md"
                  value={zcNombresInput}
                  onChange={(e) => setZcNombresInput(e.target.value)}
                  placeholder={`Ejemplo:\nEntrada Principal\nPiscina\nGimnasio`}
                />

                <div className="flex-end-mt12">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => { setZcNombresInput(""); setZcCustomEdits({}); }}
                  >
                    <RotateCcw size={13} />
                    Limpiar Lista Zonas
                  </button>
                </div>
              </section>

              {/* REEMPLAZO MASIVO DE NOMBRES EN ZONAS COMUNES */}
              <section className="dash-card">
                <div className="card-header-flex">
                  <div className="card-title-group">
                    <div>
                      <h3 className="card-title zone-header">Reemplazo de Nombres</h3>
                      <p className="card-desc">Sustituye la clave principal conservando la URL</p>
                    </div>
                  </div>
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      className="toggle-checkbox toggle-checkbox-purple"
                      checked={zcActivarReemplazo}
                      onChange={(e) => setZcActivarReemplazo(e.target.checked)}
                    />
                    <span className={zcActivarReemplazo ? 'toggle-text toggle-text-purple' : 'toggle-text toggle-text-inactive'}>
                      {zcActivarReemplazo ? 'Activo' : 'Inactivo'}
                    </span>
                  </label>
                </div>

                <textarea
                  className="text-input-area purple-focus input-area-sm"
                  style={{ opacity: zcActivarReemplazo ? 1 : 0.45 }}
                  value={zcNombresReemplazoInput}
                  onChange={(e) => setZcNombresReemplazoInput(e.target.value)}
                  placeholder={`Ejemplo nuevos nombres:\nEntrada-Principal-01\nPiscina-Exterior\nGimnasio-Nivel-1`}
                  disabled={!zcActivarReemplazo}
                />

                <div className="flex-between-wrap-mt14">
                  <StatusPill estado={zcCoincidenciaEstado} />

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setZcNombresReemplazoInput("")}
                  >
                    <RotateCcw size={13} />
                    Limpiar
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* PANEL 2: CONFIGURACIÓN GENERAL */}
          <section className="dash-card">
            <div className="card-header-flex">
              <div className="card-title-group">
                <div>
                  <h3 className="card-title">2. Parámetros Generales</h3>
                  <p className="card-desc">Configuración global para rutas y cámara</p>
                </div>
              </div>
            </div>

            <div className="form-grid-layout">
              <div className="form-field full-width">
                <label className="form-label">Proyecto</label>
                <input
                  className="custom-input"
                  type="text"
                  value={config.proyecto}
                  onChange={(e) => actualizarConfig("proyecto", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Subcarpeta RUTA</label>
                <input
                  className="custom-input"
                  type="text"
                  value={pantallaActiva === 'vistas' ? config.subcarpeta : config.zcSubcarpeta}
                  onChange={(e) => actualizarConfig(pantallaActiva === 'vistas' ? "subcarpeta" : "zcSubcarpeta", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Carpeta</label>
                <input
                  className="custom-input"
                  type="text"
                  value={pantallaActiva === 'vistas' ? config.carpeta : config.zcCarpeta}
                  onChange={(e) => actualizarConfig(pantallaActiva === 'vistas' ? "carpeta" : "zcCarpeta", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Extensión</label>
                <select
                  className="custom-select"
                  value={config.extension}
                  onChange={(e) => actualizarConfig("extension", e.target.value)}
                >
                  <option value="webp">webp</option>
                  <option value="jpg">jpg</option>
                  <option value="png">png</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Panorama Rotation</label>
                <input
                  className="custom-input"
                  type="number"
                  value={config.panoramaRotation}
                  onChange={(e) => actualizarConfig("panoramaRotation", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Init Zoom</label>
                <input
                  className="custom-input"
                  type="number"
                  step="0.1"
                  value={config.cameraInitZoom}
                  onChange={(e) => actualizarConfig("cameraInitZoom", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Zoom Mín / Máx</label>
                <div className="flex-gap-8">
                  <input
                    className="custom-input"
                    type="number"
                    step="0.05"
                    value={config.cameraZoomMin}
                    onChange={(e) => actualizarConfig("cameraZoomMin", e.target.value)}
                  />
                  <input
                    className="custom-input"
                    type="number"
                    step="0.5"
                    value={config.cameraZoomMax}
                    onChange={(e) => actualizarConfig("cameraZoomMax", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {pantallaActiva === 'vistas' && (
          <>
            {/* TOOLBAR APPLE */}
            <div className="global-toolbar">
              <button className="btn btn-secondary" onClick={() => setTodosColapsados(!todosColapsados)}>
                {todosColapsados ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                <span>{todosColapsados ? "Expandir Vistas" : "Colapsar Vistas"}</span>
              </button>

              <label className="toolbar-toggle">
                <input
                  type="checkbox"
                  className="toggle-checkbox"
                  checked={config.jsonEstricto}
                  onChange={(e) => actualizarConfig("jsonEstricto", e.target.checked)}
                />
                <span>JSON Estricto (RFC 8259)</span>
              </label>
            </div>

            {/* SECCIÓN 3: RESULTADO BASE */}
            <section className="result-section-card">
              <div className="card-header-flex">
                <div>
                  <h3 className="card-title">3. Resultado Generado</h3>
                  <p className="card-desc">Vistas base originales {activarReemplazo ? '(con nombres reemplazados)' : ''}</p>
                </div>
                {bloquesOriginales.length > 0 && (
                  <button
                    className={`btn ${copiadoOrig ? 'btn-secondary btn-copiado' : 'btn-primary-blue'}`}
                    onClick={() =>
                      copiarTexto(
                        bloquesOriginales.map((b) => b.contenido).join("\n\n"),
                        setCopiadoOrig
                      )
                    }
                  >
                    {copiadoOrig ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copiadoOrig ? "Copiado" : "Copiar Estructura Base"}</span>
                  </button>
                )}
              </div>
              <SeccionResultadoConNombres
                bloques={bloquesOriginales}
                colapsados={todosColapsados}
                colorClave="var(--accent-blue)"
                copiadoNombres={copiadoNombresOrig}
                onCopiarNombres={(txt) => copiarTexto(txt, setCopiadoNombresOrig)}
              />
            </section>

            {/* SECCIÓN 4: VISTAS DUPLICADAS PISOS CON SELECTOR DE DIRECCIÓN */}
            <section className="result-section-card">
              <div className="card-header-flex">
                <div>
                  <h3 className="card-title">4. Vistas Duplicadas Verticalmente</h3>
                  <p className="card-desc">Calcula incrementos de pisos en la dirección elegida (+/- 100, 200...)</p>
                </div>
                <div className="inline-form-controls">
                  <div className="control-item">
                    <span>Dirección:</span>
                    <select
                      className="select-transparent"
                      value={direccionPisos}
                      onChange={(e) => setDireccionPisos(e.target.value)}
                    >
                      <option value="ambos">Arriba y Abajo</option>
                      <option value="arriba">Solo Arriba</option>
                      <option value="abajo">Solo Abajo</option>
                    </select>
                  </div>
                  <div className="control-item">
                    <span>Cantidad:</span>
                    <input
                      className="input-num-sm"
                      type="number"
                      min="1"
                      value={cantPisos}
                      onChange={(e) => setCantPisos(Number(e.target.value))}
                    />
                  </div>
                  <div className="control-item">
                    <span>Paso:</span>
                    <input
                      className="input-num-sm"
                      type="number"
                      min="1"
                      value={pasoPisos}
                      onChange={(e) => setPasoPisos(Number(e.target.value))}
                    />
                  </div>
                  <div className="control-item">
                    <span>Excluir:</span>
                    <input
                      className="input-num-md"
                      type="text"
                      placeholder="1, 2"
                      value={pisosAExcluir}
                      onChange={(e) => setPisosAExcluir(e.target.value)}
                    />
                  </div>
                  {bloquesVerticales.length > 0 && (
                    <button
                      className="btn btn-primary-purple"
                      onClick={() =>
                        copiarTexto(
                          bloquesVerticales.map((b) => b.contenido).join("\n\n"),
                          setCopiadoVert
                        )
                      }
                    >
                      {copiadoVert ? <Check size={16} /> : <Copy size={16} />}
                      <span>{copiadoVert ? "Copiado" : `Copiar (${direccionPisos === 'ambos' ? 'Arriba/Abajo' : direccionPisos === 'arriba' ? 'Solo Arriba' : 'Solo Abajo'})`}</span>
                    </button>
                  )}
                </div>
              </div>
              <SeccionResultadoConNombres
                bloques={bloquesVerticales}
                colapsados={todosColapsados}
                colorClave="var(--accent-purple)"
                copiadoNombres={copiadoNombresVert}
                onCopiarNombres={(txt) => copiarTexto(txt, setCopiadoNombresVert)}
              />
            </section>

            {/* SECCIÓN 5: VISTAS LADO 1 */}
            <section className="result-section-card">
              <div className="card-header-flex">
                <div>
                  <h3 className="card-title">5. Vistas Duplicadas Hacia Un Lado</h3>
                  <p className="card-desc">Filtra y reemplaza terminaciones numéricas</p>
                </div>
                <div className="inline-form-controls">
                  <label className="checkbox-label-sm">
                    <input
                      type="checkbox"
                      checked={incluirVertLado1}
                      onChange={(e) => setIncluirVertLado1(e.target.checked)}
                    />
                    <span>+ Incluir Verticales</span>
                  </label>
                  <div className="control-item">
                    <span>Origen:</span>
                    <input
                      className="input-text-sm"
                      type="text"
                      value={origenLado1}
                      onChange={(e) => setOrigenLado1(e.target.value)}
                    />
                  </div>
                  <div className="control-item">
                    <span>Destino:</span>
                    <input
                      className="input-text-sm"
                      type="text"
                      value={destinoLado1}
                      onChange={(e) => setDestinoLado1(e.target.value)}
                    />
                  </div>
                  {bloquesLado1.length > 0 && (
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        copiarTexto(
                          bloquesLado1.map((b) => b.contenido).join("\n\n"),
                          setCopiadoLado1
                        )
                      }
                    >
                      {copiadoLado1 ? <Check size={16} /> : <Copy size={16} />}
                      <span>{copiadoLado1 ? "Copiado" : "Copiar Este Lado"}</span>
                    </button>
                  )}
                </div>
              </div>
              <SeccionResultadoConNombres
                bloques={bloquesLado1}
                colapsados={todosColapsados}
                colorClave="var(--accent-blue)"
                copiadoNombres={copiadoNombresLado1}
                onCopiarNombres={(txt) => copiarTexto(txt, setCopiadoNombresLado1)}
              />
            </section>

            {/* SECCIÓN 6: VISTAS LADO 2 */}
            <section className="result-section-card">
              <div className="card-header-flex">
                <div>
                  <h3 className="card-title">6. Vistas Duplicadas Hacia El Otro Lado</h3>
                  <p className="card-desc">Filtra y reemplaza la segunda terminación de lista</p>
                </div>
                <div className="inline-form-controls">
                  <label className="checkbox-label-sm">
                    <input
                      type="checkbox"
                      className="toggle-checkbox-orange"
                      checked={incluirVertLado2}
                      onChange={(e) => setIncluirVertLado2(e.target.checked)}
                    />
                    <span>+ Incluir Verticales</span>
                  </label>
                  <div className="control-item">
                    <span>Origen:</span>
                    <input
                      className="input-text-sm"
                      type="text"
                      value={origenLado2}
                      onChange={(e) => setOrigenLado2(e.target.value)}
                    />
                  </div>
                  <div className="control-item">
                    <span>Destino:</span>
                    <input
                      className="input-text-sm"
                      type="text"
                      value={destinoLado2}
                      onChange={(e) => setDestinoLado2(e.target.value)}
                    />
                  </div>
                  {bloquesLado2.length > 0 && (
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        copiarTexto(
                          bloquesLado2.map((b) => b.contenido).join("\n\n"),
                          setCopiadoLado2
                        )
                      }
                    >
                      {copiadoLado2 ? <Check size={16} /> : <Copy size={16} />}
                      <span>{copiadoLado2 ? "Copiado" : "Copiar Otro Lado"}</span>
                    </button>
                  )}
                </div>
              </div>
              <SeccionResultadoConNombres
                bloques={bloquesLado2}
                colapsados={todosColapsados}
                colorClave="var(--accent-orange)"
                copiadoNombres={copiadoNombresLado2}
                onCopiarNombres={(txt) => copiarTexto(txt, setCopiadoNombresLado2)}
              />
            </section>
          </>
        )}

        {pantallaActiva === 'zonas' && (
          <div style={{ marginTop: '16px' }}>
            {zcItems.length > 0 && (
              <div className="zone-title-bar animate-fade-in">
                <h3 className="card-title zone-header-flex">
                  <IconBuilding size={18} />
                  Edición de Zonas Comunes ({zcItems.length})
                </h3>
                <button
                  className="btn btn-ghost-danger btn-sm"
                  onClick={() => { setZcNombresInput(""); setZcNombresReemplazoInput(""); setZcCustomEdits({}); }}
                >
                  <Trash2 size={14} />
                  Limpiar Todo
                </button>
              </div>
            )}

            {zcItems.length === 0 ? (
              <div className="code-viewer-container empty-placeholder">
                <div className="empty-icon-box">
                  <IconBuilding size={24} />
                </div>
                <p className="zone-empty-msg">
                  Escribe los nombres de las zonas comunes en el cuadro superior para generar en tiempo real...
                </p>
              </div>
            ) : (
              <div className="zone-grid">
                {zcBloquesGenerados.map((bloque, index) => (
                  <ZonaComunCard
                    key={bloque.item.id}
                    index={index}
                    bloque={bloque}
                    onUpdate={zcActualizarItem}
                    onDelete={zcEliminarItem}
                  />
                ))}
              </div>
            )}

            {zcItems.length > 0 && (
              <section className="result-section-card zone-result-section">
                <div className="card-header-flex">
                  <div>
                    <h3 className="card-title">Resultado Final Zonas Comunes (JSON5)</h3>
                    <p className="card-desc">Estructura completa lista para copiar {zcActivarReemplazo ? '(con nombres reemplazados)' : ''}</p>
                  </div>
                  <div className="zone-flex-10">
                    <button className="btn btn-secondary" onClick={() => setZcColapsados(!zcColapsados)}>
                      {zcColapsados ? <ChevronRight size={15} /> : <ChevronDown size={15} />}
                      <span>{zcColapsados ? "Expandir código" : "Colapsar código"}</span>
                    </button>
                    <button
                      className="btn btn-primary-purple"
                      onClick={() =>
                        copiarTexto(
                          zcBloquesGenerados.map((b) => b.contenido).join('\n\n'),
                          setCopiadoZC
                        )
                      }
                    >
                      {copiadoZC ? <Check size={16} /> : <Copy size={16} />}
                      <span>{copiadoZC ? 'Copiado' : 'Copiar Código Completo'}</span>
                    </button>
                  </div>
                </div>

                <SeccionResultadoConNombres
                  bloques={zcBloquesGenerados}
                  colapsados={zcColapsados}
                  colorClave="var(--accent-purple)"
                  copiadoNombres={copiadoNombresZC}
                  onCopiarNombres={(txt) => copiarTexto(txt, setCopiadoNombresZC)}
                />
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function StatusPill({ estado }) {
  if (estado.tipo === "success") {
    return (
      <span className="status-pill success">
        <CheckCircle2 size={14} />
        {estado.mensaje}
      </span>
    );
  }
  if (estado.tipo === "danger") {
    return (
      <span className="status-pill danger">
        <AlertTriangle size={14} />
        {estado.mensaje}
      </span>
    );
  }
  if (estado.tipo === "warning") {
    return (
      <span className="status-pill warning">
        <Info size={14} />
        {estado.mensaje}
      </span>
    );
  }
  return (
    <span className="status-pill neutral">
      <Info size={14} />
      {estado.mensaje}
    </span>
  );
}

function SeccionResultadoConNombres({ bloques, colapsados, colorClave, copiadoNombres, onCopiarNombres }) {
  const listaNombresTexto = useMemo(() => {
    return bloques.map((b) => b.nombre).join("\n");
  }, [bloques]);

  if (bloques.length === 0) {
    return (
      <div className="code-viewer-container empty-placeholder empty-view-wrapper">
        <IconCode size={24} className="empty-view-icon" />
        <span className="empty-view-text">No hay vistas generadas en esta sección...</span>
      </div>
    );
  }

  return (
    <div className="result-grid animate-fade-in">
      <div className="code-viewer-container">
        {bloques.map((item, index) => (
          <div key={index} className="code-block-item">
            <details open={!colapsados}>
              <summary className="code-block-header">
                <span className="code-block-title">
                  <IconCode size={14} style={{ color: colorClave }} />
                  <span style={{ color: colorClave, fontWeight: '500' }}>"{item.nombre}"</span>
                </span>
                <span className="json-type-badge">JSON5</span>
              </summary>
              <pre className="code-content-pre">{item.contenido}</pre>
            </details>
          </div>
        ))}
      </div>

      <div className="names-panel">
        <div className="names-header">
          <span className="names-title">
            <FileText size={14} />
            Nombres ({bloques.length})
          </span>
          <button
            className="btn btn-secondary btn-xs"
            onClick={() => onCopiarNombres(listaNombresTexto)}
          >
            {copiadoNombres ? <Check size={12} /> : <Copy size={12} />}
            <span>{copiadoNombres ? "Copiado" : "Copiar"}</span>
          </button>
        </div>
        <textarea
          className="text-input-area names-textarea"
          style={{ color: colorClave }}
          value={listaNombresTexto}
          readOnly
        />
      </div>
    </div>
  );
}

function ZonaComunCard({ index, bloque, onUpdate, onDelete }) {
  const item = bloque.item;

  return (
    <div className="dash-card zone-card-item animate-fade-in">
      <div className="zone-card-header">
        <span className="zone-card-title">
          #{index + 1} — {item.clave}
        </span>
        <button
          className="btn btn-ghost-danger btn-xs"
          onClick={() => onDelete(item.id)}
        >
          <Trash2 size={13} />
          Eliminar
        </button>
      </div>

      <div className="zone-form-grid">
        <div className="form-field full-width">
          <label className="form-label">Clave</label>
          <input
            className="custom-input"
            value={item.clave}
            onChange={(e) => onUpdate(item.id, 'clave', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label className="form-label">Title 1 (ES)</label>
          <input
            className="custom-input"
            value={item.title1Es}
            onChange={(e) => onUpdate(item.id, 'title1Es', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label className="form-label">Title 1 (EN)</label>
          <input
            className="custom-input"
            value={item.title1En}
            onChange={(e) => onUpdate(item.id, 'title1En', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label className="form-label">Title 2 (ES)</label>
          <input
            className="custom-input"
            value={item.title2Es}
            onChange={(e) => onUpdate(item.id, 'title2Es', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label className="form-label">Title 2 (EN)</label>
          <input
            className="custom-input"
            value={item.title2En}
            onChange={(e) => onUpdate(item.id, 'title2En', e.target.value)}
          />
        </div>
        <div className="form-field full-width">
          <label className="form-label">URL Vista 360</label>
          <input
            className="custom-input"
            value={item.url}
            onChange={(e) => onUpdate(item.id, 'url', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}