import React, { useState, useMemo } from "react";

const DEFAULT_CONFIG = {
  proyecto: "01-LaReserva",
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
  const [pisosAExcluir, setPisosAExcluir] = useState(""); // NUEVO ESTADO

  // Parámetros Sección 5: Hacia un lado
  const [origenLado1, setOrigenLado1] = useState("01");
  const [destinoLado1, setDestinoLado1] = useState("03");

  // Parámetros Sección 6: Hacia el otro lado
  const [origenLado2, setOrigenLado2] = useState("04");
  const [destinoLado2, setDestinoLado2] = useState("02");

  // Navegación (Tabs)
  const [pantallaActiva, setPantallaActiva] = useState("vistas"); // "vistas" | "zonas"

  // Parámetros Sección 7: Zonas Comunes
  const [zcNombresInput, setZcNombresInput] = useState("");
  const [zcItems, setZcItems] = useState([]);
  const [copiadoZC, setCopiadoZC] = useState(false);
  const [copiadoNombresZC, setCopiadoNombresZC] = useState(false);
  const [zcColapsados, setZcColapsados] = useState(true);
  const [traduciendo, setTraduciendo] = useState(false);

  const zcAgregarNombres = async () => {
    const nuevos = zcNombresInput
      .split(/[\n,]+/)
      .map((s) => s.trim().replace(/\.[^/.]+$/, ""))
      .filter(Boolean);
    if (nuevos.length === 0) return;

    setTraduciendo(true);

    const nuevosItems = await Promise.all(
      nuevos.map(async (nombre) => {
        const clave = nombre.replace(/\s+/g, "");
        const nombreLimpio = nombre.replace(/_/g, " "); // Quitar guiones bajos para los títulos
        
        let title2En = nombreLimpio;
        try {
          const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(nombreLimpio)}&langpair=es|en`);
          const data = await res.json();
          if (data?.responseData?.translatedText) {
            title2En = data.responseData.translatedText;
          }
        } catch (e) {
          console.error("Error al traducir:", e);
        }

        return {
          id: crypto.randomUUID(),
          clave,
          title1Es: "Zonas Comunes",
          title1En: "Amenities", // Corregido spelling de Amenities
          title2Es: nombreLimpio,
          title2En,
          swiperImage: clave,
        };
      })
    );

    setZcItems((prev) => [...prev, ...nuevosItems]);
    setZcNombresInput("");
    setTraduciendo(false);
  };

  const zcActualizarItem = (id, campo, valor) => {
    setZcItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [campo]: valor } : item))
    );
  };

  const zcEliminarItem = (id) => {
    setZcItems((prev) => prev.filter((item) => item.id !== id));
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
    lines.push('  ]') ;
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
    lines.push('  }') ;
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
    lines.push('      }') ;
    lines.push('    }' + comma);
    lines.push('  ]') ;
    lines.push('  ' + wrap('tour360', '['));
    lines.push('    {');
    lines.push('      ' + wrap('enabled', 'false') + ',');
    lines.push('      ' + wrap('label', '["<h2>Pano 1</h2>", "<h2>Pano 1</h2>"]') + ',');
    lines.push('      ' + wrap('url', str('')) + ',');
    lines.push('    }' + comma);
    lines.push('  ]') ;
    lines.push('},');

    return lines.join('\n');
  };

  const zcBloquesGenerados = useMemo(() => {
    return zcItems.map((item) => {
      const sub = config.zcSubcarpeta?.trim() ? `${config.zcSubcarpeta.trim()}/` : "";
      const folder = config.zcCarpeta?.trim() ? `${config.zcCarpeta.trim()}/` : "";
      const computedUrl = `{origenAssets}/images/${config.proyecto}/${sub}${folder}${item.clave}.${config.extension}`;
      const computedBtnImage = `{origenAssets}/images/${config.proyecto}/${sub}${folder}jpg/${item.clave}.jpeg`;
      
      const currentUrl = item.url !== undefined ? item.url : computedUrl;
      const currentBtnImage = item.btnImage !== undefined ? item.btnImage : computedBtnImage;
      
      const itemWithComputed = { ...item, url: currentUrl, btnImage: currentBtnImage };
      
      return {
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
]`;
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

  // 3. Resultado Base
  const bloquesOriginales = useMemo(() => {
    return listaBase.map((nombre) => ({
      nombre,
      contenido: generarBloqueTexto(nombre, nombre),
    }));
  }, [listaBase, config]);

  // 4. Duplicados Arriba / Abajo (Pisos)
  const bloquesVerticales = useMemo(() => {
    const resultados = [];
    const clavesOriginales = new Set(listaBase);

    // Convertir el input "1, 2" en un arreglo ['1', '2']
    const pisosOmitidos = pisosAExcluir.split(',').map(s => s.trim()).filter(Boolean);

    // Función que verifica si el piso de un número calculado está en la lista de excluidos
    const esPisoExcluido = (numeroCalculado) => {
      if (pisosOmitidos.length === 0) return false;
      const numStr = String(numeroCalculado);
      // Asumimos que los últimos 2 dígitos son la unidad (ej: 01, 04) y el resto es el piso.
      const piso = numStr.length > 2 ? numStr.slice(0, -2) : numStr;
      return pisosOmitidos.includes(piso);
    };

    listaBase.forEach((item) => {
      const parsed = parsearNombre(item);
      if (!parsed) return;
      const { prefix, numBase, len, suffix } = parsed;

      for (let i = 1; i <= cantPisos; i++) {
        const incremento = i * Number(pasoPisos) * 100;

        // Abajo
        const numAbajo = numBase - incremento;
        if (numAbajo > 0 && !esPisoExcluido(numAbajo)) {
          const lenAbajo = String(numAbajo).length > len ? String(numAbajo).length : len;
          const targetLen = numBase >= 1000 && numAbajo < 1000 ? String(numAbajo).length : lenAbajo;

          const clave = `${prefix}${String(numAbajo).padStart(targetLen, "0")}${suffix}`;
          if (!clavesOriginales.has(clave)) {
            resultados.push({ nombreClave: clave, nombreBaseOriginal: item });
          }
        }

        // Arriba
        const numArriba = numBase + incremento;
        if (!esPisoExcluido(numArriba)) {
          const targetLenArriba = Math.max(len, String(numArriba).length);
          const claveArriba = `${prefix}${String(numArriba).padStart(targetLenArriba, "0")}${suffix}`;
          if (!clavesOriginales.has(claveArriba)) {
            resultados.push({ nombreClave: claveArriba, nombreBaseOriginal: item });
          }
        }
      }
    });

    return resultados.map((obj) => ({
      nombre: obj.nombreClave,
      contenido: generarBloqueTexto(obj.nombreClave, obj.nombreBaseOriginal),
    }));
  }, [listaBase, cantPisos, pasoPisos, pisosAExcluir, config]);

  // 5. Duplicados Hacia un Lado
  const bloquesLado1 = useMemo(() => {
    const resultados = [];
    listaBase.forEach((item) => {
      const match = reemplazarTerminacion(item, origenLado1.trim(), destinoLado1.trim());
      if (match) {
        resultados.push(match);
      }
    });

    return resultados.map((obj) => ({
      nombre: obj.nombreClave,
      contenido: generarBloqueTexto(obj.nombreClave, obj.nombreBaseOriginal),
    }));
  }, [listaBase, origenLado1, destinoLado1, config]);

  // 6. Duplicados Hacia el Otro Lado
  const bloquesLado2 = useMemo(() => {
    const resultados = [];
    listaBase.forEach((item) => {
      const match = reemplazarTerminacion(item, origenLado2.trim(), destinoLado2.trim());
      if (match) {
        resultados.push(match);
      }
    });

    return resultados.map((obj) => ({
      nombre: obj.nombreClave,
      contenido: generarBloqueTexto(obj.nombreClave, obj.nombreBaseOriginal),
    }));
  }, [listaBase, origenLado2, destinoLado2, config]);

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

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>360</div>
            <div>
              <h1 style={styles.h1}>Generador de Vistas 360°</h1>
              <p style={styles.subtext}>Crea configuraciones de panoramas al instante</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              style={{ ...styles.btnPrimary, backgroundColor: pantallaActiva === 'vistas' ? '#2563EB' : '#334155' }}
              onClick={() => setPantallaActiva('vistas')}
            >
              Vistas 360
            </button>
            <button 
              style={{ ...styles.btnPrimary, backgroundColor: pantallaActiva === 'zonas' ? '#6366F1' : '#334155' }}
              onClick={() => setPantallaActiva('zonas')}
            >
              Zonas Comunes
            </button>
          </div>
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.grid}>
          {/* PANEL IZQUIERDO DINÁMICO SEGÚN PESTAÑA */}
          {pantallaActiva === 'vistas' ? (
            <section style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <h3 style={styles.h3}>1. Lista de Vistas</h3>
                  <p style={styles.subtext}>Pega tus identificadores</p>
                </div>
                <span style={styles.counter}>{listaBase.length}</span>
              </div>

              <textarea
                style={styles.namesInput}
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                placeholder={`Ejemplo:\n1-301\n1-304\n2-501`}
              />

              <button style={styles.btnSecondary} onClick={() => setNombres("")}>
                Limpiar Entrada
              </button>
            </section>
          ) : (
            <section style={{ ...styles.card, borderColor: '#6366F1' }}>
              <div style={styles.cardHeader}>
                <div>
                  <h3 style={{ ...styles.h3, color: '#A5B4FC' }}>Zonas Comunes</h3>
                  <p style={styles.subtext}>Ingresa los nombres de las zonas comunes</p>
                </div>
                <span style={{ ...styles.counter, color: '#A5B4FC' }}>{zcItems.length}</span>
              </div>

              <textarea
                style={{ ...styles.namesInput, height: '175px' }}
                value={zcNombresInput}
                onChange={(e) => setZcNombresInput(e.target.value)}
                placeholder={`Ejemplo:\nEntrada Principal\nPiscina\nGimnasio`}
              />

              <button
                style={{
                  ...styles.btnPrimary,
                  backgroundColor: traduciendo ? '#94A3B8' : '#6366F1',
                  width: '100%',
                  marginTop: '12px',
                  cursor: traduciendo ? 'not-allowed' : 'pointer'
                }}
                onClick={zcAgregarNombres}
                disabled={traduciendo}
              >
                {traduciendo ? '⏳ Traduciendo y Agregando...' : '➕ Agregar Zonas Comunes'}
              </button>
            </section>
          )}

          {/* PANEL 2: CONFIGURACIÓN */}
          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <h3 style={styles.h3}>2. Parámetros General</h3>
                <p style={styles.subtext}>Configuración de la vista</p>
              </div>
            </div>

            <div style={styles.formGrid}>
              <div style={{ ...styles.field, gridColumn: "span 2" }}>
                <label style={styles.label}>Proyecto</label>
                <input
                  style={styles.input}
                  type="text"
                  value={config.proyecto}
                  onChange={(e) => actualizarConfig("proyecto", e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Subcarpeta RUTA</label>
                <input
                  style={styles.input}
                  type="text"
                  value={pantallaActiva === 'vistas' ? config.subcarpeta : config.zcSubcarpeta}
                  onChange={(e) => actualizarConfig(pantallaActiva === 'vistas' ? "subcarpeta" : "zcSubcarpeta", e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Carpeta</label>
                <input
                  style={styles.input}
                  type="text"
                  value={pantallaActiva === 'vistas' ? config.carpeta : config.zcCarpeta}
                  onChange={(e) => actualizarConfig(pantallaActiva === 'vistas' ? "carpeta" : "zcCarpeta", e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Extensión</label>
                <select
                  style={styles.input}
                  value={config.extension}
                  onChange={(e) => actualizarConfig("extension", e.target.value)}
                >
                  <option value="webp">webp</option>
                  <option value="jpg">jpg</option>
                  <option value="png">png</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Panorama Rotation</label>
                <input
                  style={styles.input}
                  type="number"
                  value={config.panoramaRotation}
                  onChange={(e) => actualizarConfig("panoramaRotation", e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Init Zoom</label>
                <input
                  style={styles.input}
                  type="number"
                  step="0.1"
                  value={config.cameraInitZoom}
                  onChange={(e) => actualizarConfig("cameraInitZoom", e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Zoom Mín / Máx</label>
                <div style={{ display: "flex", gap: "6px" }}>
                  <input
                    style={styles.input}
                    type="number"
                    step="0.05"
                    value={config.cameraZoomMin}
                    onChange={(e) => actualizarConfig("cameraZoomMin", e.target.value)}
                  />
                  <input
                    style={styles.input}
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
            {/* CONTROLES GLOBAL DE VISUALIZACIÓN */}
            <div style={styles.globalBar}>
              <button style={styles.btnActionSmall} onClick={() => setTodosColapsados(!todosColapsados)}>
                {todosColapsados ? "▶ Expandir todo" : "▼ Colapsar todo"}
              </button>

              <label style={{ ...styles.subtext, cursor: "pointer", display: "flex", gap: "6px", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={config.jsonEstricto}
                  onChange={(e) => actualizarConfig("jsonEstricto", e.target.checked)}
                />
                JSON Estricto
              </label>
            </div>

            {/* SECCIÓN 3: RESULTADO GENERADO (ORIGINALES) */}
        <section style={styles.resultCard}>
          <div style={styles.cardHeader}>
            <div>
              <h3 style={styles.h3}>3. Resultado Generado</h3>
              <p style={styles.subtext}>Vistas base originales</p>
            </div>
            {bloquesOriginales.length > 0 && (
              <button
                style={{ ...styles.btnPrimary, backgroundColor: copiadoOrig ? "#10B981" : "#3B82F6" }}
                onClick={() =>
                  copiarTexto(
                    bloquesOriginales.map((b) => b.contenido).join("\n\n"),
                    setCopiadoOrig
                  )
                }
              >
                {copiadoOrig ? "✓ Copiado" : "📋 Copiar Estructura Base"}
              </button>
            )}
          </div>
          <SeccionResultadoConNombres
            bloques={bloquesOriginales}
            colapsados={todosColapsados}
            colorClave="#38BDF8"
            copiadoNombres={copiadoNombresOrig}
            onCopiarNombres={(txt) => copiarTexto(txt, setCopiadoNombresOrig)}
          />
        </section>

        {/* SECCIÓN 4: VISTAS DUPLICADAS PARA ARRIBA Y ABAJO */}
        <section style={styles.resultCard}>
          <div style={styles.cardHeader}>
            <div>
              <h3 style={styles.h3}>4. Vistas duplicadas para arriba y abajo</h3>
              <p style={styles.subtext}>Calcula incrementos de pisos (+/- 100, 200, etc.)</p>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div style={styles.inlineControl}>
                <span style={styles.label}>Cantidad:</span>
                <input
                  style={{ ...styles.input, width: "60px" }}
                  type="number"
                  min="1"
                  value={cantPisos}
                  onChange={(e) => setCantPisos(Number(e.target.value))}
                />
              </div>
              <div style={styles.inlineControl}>
                <span style={styles.label}>Paso Piso:</span>
                <input
                  style={{ ...styles.input, width: "60px" }}
                  type="number"
                  min="1"
                  value={pasoPisos}
                  onChange={(e) => setPasoPisos(Number(e.target.value))}
                />
              </div>
              {/* NUEVO CAMPO DE EXCLUSIÓN */}
              <div style={styles.inlineControl}>
                <span style={styles.label}>Excluir pisos:</span>
                <input
                  style={{ ...styles.input, width: "80px" }}
                  type="text"
                  placeholder="Ej: 1, 2"
                  value={pisosAExcluir}
                  onChange={(e) => setPisosAExcluir(e.target.value)}
                  title="Separa por comas los números de piso que no existen. Ej: 1, 2"
                />
              </div>
              {bloquesVerticales.length > 0 && (
                <button
                  style={{ ...styles.btnPrimary, backgroundColor: copiadoVert ? "#10B981" : "#8B5CF6" }}
                  onClick={() =>
                    copiarTexto(
                      bloquesVerticales.map((b) => b.contenido).join("\n\n"),
                      setCopiadoVert
                    )
                  }
                >
                  {copiadoVert ? "✓ Copiado" : "📋 Copiar Arriba/Abajo"}
                </button>
              )}
            </div>
          </div>
          <SeccionResultadoConNombres
            bloques={bloquesVerticales}
            colapsados={todosColapsados}
            colorClave="#A7F3D0"
            copiadoNombres={copiadoNombresVert}
            onCopiarNombres={(txt) => copiarTexto(txt, setCopiadoNombresVert)}
          />
        </section>

        {/* SECCIÓN 5: VISTAS DUPLICADAS HACIA UN LADO */}
        <section style={styles.resultCard}>
          <div style={styles.cardHeader}>
            <div>
              <h3 style={styles.h3}>5. Vistas duplicadas hacia un lado</h3>
              <p style={styles.subtext}>Filtra por los últimos números y reemplaza la terminación</p>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div style={styles.inlineControl}>
                <span style={styles.label}>Si termina en:</span>
                <input
                  style={{ ...styles.input, width: "65px" }}
                  type="text"
                  placeholder="01"
                  value={origenLado1}
                  onChange={(e) => setOrigenLado1(e.target.value)}
                />
              </div>
              <div style={styles.inlineControl}>
                <span style={styles.label}>Cambiar a:</span>
                <input
                  style={{ ...styles.input, width: "65px" }}
                  type="text"
                  placeholder="03"
                  value={destinoLado1}
                  onChange={(e) => setDestinoLado1(e.target.value)}
                />
              </div>
              {bloquesLado1.length > 0 && (
                <button
                  style={{ ...styles.btnPrimary, backgroundColor: copiadoLado1 ? "#10B981" : "#EC4899" }}
                  onClick={() =>
                    copiarTexto(
                      bloquesLado1.map((b) => b.contenido).join("\n\n"),
                      setCopiadoLado1
                    )
                  }
                >
                  {copiadoLado1 ? "✓ Copiado" : "📋 Copiar Este Lado"}
                </button>
              )}
            </div>
          </div>
          <SeccionResultadoConNombres
            bloques={bloquesLado1}
            colapsados={todosColapsados}
            colorClave="#F472B6"
            copiadoNombres={copiadoNombresLado1}
            onCopiarNombres={(txt) => copiarTexto(txt, setCopiadoNombresLado1)}
          />
        </section>

        {/* SECCIÓN 6: VISTAS DUPLICADAS HACIA EL OTRO LADO */}
        <section style={styles.resultCard}>
          <div style={styles.cardHeader}>
            <div>
              <h3 style={styles.h3}>6. Vistas duplicadas hacia el otro lado</h3>
              <p style={styles.subtext}>Filtra por los últimos números y reemplaza la terminación</p>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div style={styles.inlineControl}>
                <span style={styles.label}>Si termina en:</span>
                <input
                  style={{ ...styles.input, width: "65px" }}
                  type="text"
                  placeholder="04"
                  value={origenLado2}
                  onChange={(e) => setOrigenLado2(e.target.value)}
                />
              </div>
              <div style={styles.inlineControl}>
                <span style={styles.label}>Cambiar a:</span>
                <input
                  style={{ ...styles.input, width: "65px" }}
                  type="text"
                  placeholder="02"
                  value={destinoLado2}
                  onChange={(e) => setDestinoLado2(e.target.value)}
                />
              </div>
              {bloquesLado2.length > 0 && (
                <button
                  style={{ ...styles.btnPrimary, backgroundColor: copiadoLado2 ? "#10B981" : "#F59E0B" }}
                  onClick={() =>
                    copiarTexto(
                      bloquesLado2.map((b) => b.contenido).join("\n\n"),
                      setCopiadoLado2
                    )
                  }
                >
                  {copiadoLado2 ? "✓ Copiado" : "📋 Copiar Otro Lado"}
                </button>
              )}
            </div>
          </div>
          <SeccionResultadoConNombres
            bloques={bloquesLado2}
            colapsados={todosColapsados}
            colorClave="#FBBF24"
            copiadoNombres={copiadoNombresLado2}
            onCopiarNombres={(txt) => copiarTexto(txt, setCopiadoNombresLado2)}
          />
        </section>
        </>
        )}

        {pantallaActiva === 'zonas' && (
          <div style={{ marginTop: '24px' }}>
            {zcItems.length > 0 && (
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ ...styles.h3, color: '#A5B4FC' }}>Edición de Zonas Comunes</h3>
                <button
                  style={{ ...styles.btnActionSmall, borderColor: '#EF4444', color: '#F87171' }}
                  onClick={() => setZcItems([])}
                >
                  🗑 Limpiar Todo
                </button>
              </div>
            )}

            {/* Lista de ZC items editables */}
            {zcItems.length === 0 ? (
              <div style={styles.codeContainer}>
                <span style={{ color: '#64748B' }}>// Agrega nombres de zonas comunes arriba para empezar...</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
              <section style={{ ...styles.resultCard, borderColor: '#6366F1', borderWidth: '1px' }}>
                <div style={styles.cardHeader}>
                  <div>
                    <h3 style={styles.h3}>Resultado Final Zonas Comunes</h3>
                    <p style={styles.subtext}>Copia la estructura JSON generada</p>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <label style={{ ...styles.subtext, cursor: "pointer", display: "flex", gap: "6px", alignItems: "center", marginRight: "10px" }}>
                      <input
                        type="checkbox"
                        checked={config.jsonEstricto}
                        onChange={(e) => actualizarConfig("jsonEstricto", e.target.checked)}
                      />
                      JSON Estricto
                    </label>
                    <button style={styles.btnActionSmall} onClick={() => setZcColapsados(!zcColapsados)}>
                      {zcColapsados ? "▶ Expandir código" : "▼ Colapsar código"}
                    </button>
                    <button
                      style={{ ...styles.btnPrimary, backgroundColor: copiadoZC ? '#10B981' : '#6366F1' }}
                      onClick={() =>
                        copiarTexto(
                          zcBloquesGenerados.map((b) => b.contenido).join('\n\n'),
                          setCopiadoZC
                        )
                      }
                    >
                      {copiadoZC ? '✓ Copiado' : '📋 Copiar Código Completo'}
                    </button>
                  </div>
                </div>

                <SeccionResultadoConNombres
                  bloques={zcBloquesGenerados}
                  colapsados={zcColapsados}
                  colorClave="#A5B4FC"
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

function SeccionResultadoConNombres({ bloques, colapsados, colorClave, copiadoNombres, onCopiarNombres }) {
  const listaNombresTexto = useMemo(() => {
    return bloques.map((b) => b.nombre).join("\n");
  }, [bloques]);

  if (bloques.length === 0) {
    return (
      <div style={styles.codeContainer}>
        <span style={{ color: "#64748B" }}>// No hay vistas generadas en esta sección...</span>
      </div>
    );
  }

  return (
    <div style={styles.dualGrid}>
      <div style={styles.codeContainer}>
        {bloques.map((item, index) => (
          <details key={index} open={!colapsados} style={styles.detailsBlock}>
            <summary style={styles.summaryTitle}>
              <span style={{ color: colorClave, fontWeight: "bold" }}>"{item.nombre}"</span>
              <span style={{ color: "#64748B", fontSize: "12px", marginLeft: "8px" }}>[ ... ]</span>
            </summary>
            <pre style={styles.codePre}>{item.contenido}</pre>
          </details>
        ))}
      </div>

      <div style={styles.namesSideContainer}>
        <div style={styles.namesSideHeader}>
          <span style={styles.label}>Lista de Nombres ({bloques.length})</span>
          <button
            style={{
              ...styles.btnActionSmall,
              backgroundColor: copiadoNombres ? "#10B981" : "#334155",
              color: copiadoNombres ? "#FFF" : "#E2E8F0",
            }}
            onClick={() => onCopiarNombres(listaNombresTexto)}
          >
            {copiadoNombres ? "✓ Copiados" : "📋 Copiar Nombres"}
          </button>
        </div>
        <textarea style={styles.namesOutput} value={listaNombresTexto} readOnly />
      </div>
    </div>
  );
}

function ZonaComunCard({ index, bloque, onUpdate, onDelete }) {
  const item = bloque.item;

  return (
    <div
      style={{
        backgroundColor: '#0F172A',
        border: '1px solid #334155',
        borderRadius: '8px',
        padding: '12px',
        borderLeft: '3px solid #6366F1',
      }}
    >
      {/* Header con nombre y controles */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ color: '#A5B4FC', fontWeight: 'bold', fontSize: '14px' }}>
          #{index + 1} — {item.clave}
        </span>
        <button
          style={{ ...styles.btnActionSmall, borderColor: '#EF4444', color: '#F87171' }}
          onClick={() => onDelete(item.id)}
        >
          ✕ Eliminar
        </button>
      </div>

      {/* Campos editables */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <div style={{ ...styles.field, gridColumn: 'span 2' }}>
          <label style={styles.label}>Clave (nombre entrada)</label>
          <input
            style={styles.input}
            value={item.clave}
            onChange={(e) => onUpdate(item.id, 'clave', e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Title1 Español (p)</label>
          <input
            style={styles.input}
            value={item.title1Es}
            onChange={(e) => onUpdate(item.id, 'title1Es', e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Title1 Inglés (p)</label>
          <input
            style={styles.input}
            value={item.title1En}
            onChange={(e) => onUpdate(item.id, 'title1En', e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Title2 Español (h2)</label>
          <input
            style={styles.input}
            value={item.title2Es}
            onChange={(e) => onUpdate(item.id, 'title2Es', e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Title2 Inglés (h2)</label>
          <input
            style={styles.input}
            value={item.title2En}
            onChange={(e) => onUpdate(item.id, 'title2En', e.target.value)}
          />
        </div>
        <div style={{ ...styles.field, gridColumn: 'span 2' }}>
          <label style={styles.label}>URL vista360</label>
          <input
            style={styles.input}
            value={item.url}
            onChange={(e) => onUpdate(item.id, 'url', e.target.value)}
          />
        </div>
        <div style={{ ...styles.field, gridColumn: 'span 2' }}>
          <label style={styles.label}>btnImage URL</label>
          <input
            style={styles.input}
            value={item.btnImage}
            onChange={(e) => onUpdate(item.id, 'btnImage', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#0B0F17",
    color: "#E2E8F0",
    fontFamily: "system-ui, -apple-system, sans-serif",
    padding: "24px",
    boxSizing: "border-box",
  },
  header: {
    marginBottom: "24px",
    borderBottom: "1px solid #1E293B",
    paddingBottom: "16px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  logoIcon: {
    width: "44px",
    height: "44px",
    backgroundColor: "#2563EB",
    color: "#FFF",
    fontWeight: "bold",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },
  h1: { margin: 0, fontSize: "20px", fontWeight: "600" },
  h3: { margin: 0, fontSize: "16px", fontWeight: "600" },
  subtext: { margin: "2px 0 0 0", fontSize: "13px", color: "#94A3B8" },
  container: { maxWidth: "1200px", margin: "0 auto" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #334155",
  },
  resultCard: {
    backgroundColor: "#1E293B",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #334155",
    marginTop: "20px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  counter: {
    backgroundColor: "#334155",
    color: "#38BDF8",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  namesInput: {
    width: "100%",
    height: "220px",
    backgroundColor: "#0F172A",
    border: "1px solid #334155",
    borderRadius: "8px",
    color: "#F8FAFC",
    padding: "12px",
    boxSizing: "border-box",
    fontSize: "13px",
    fontFamily: "monospace",
    outline: "none",
    resize: "none",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  field: { display: "flex", flexDirection: "column", gap: "4px" },
  inlineControl: { display: "flex", alignItems: "center", gap: "6px" },
  label: { fontSize: "12px", color: "#94A3B8" },
  input: {
    width: "100%",
    backgroundColor: "#0F172A",
    border: "1px solid #334155",
    borderRadius: "6px",
    color: "#F8FAFC",
    padding: "8px",
    boxSizing: "border-box",
    fontSize: "13px",
    outline: "none",
  },
  btnPrimary: {
    color: "#FFF",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "13px",
  },
  btnSecondary: {
    width: "100%",
    marginTop: "12px",
    backgroundColor: "transparent",
    color: "#94A3B8",
    border: "1px solid #334155",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  btnActionSmall: {
    backgroundColor: "#334155",
    color: "#E2E8F0",
    border: "1px solid #475569",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
  },
  globalBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "16px",
    marginTop: "20px",
  },
  dualGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 280px",
    gap: "16px",
  },
  codeContainer: {
    backgroundColor: "#0F172A",
    border: "1px solid #334155",
    borderRadius: "8px",
    padding: "16px",
    maxHeight: "300px",
    overflowY: "auto",
    fontFamily: "Consolas, Monaco, monospace",
    fontSize: "13px",
  },
  namesSideContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    backgroundColor: "#0F172A",
    border: "1px solid #334155",
    borderRadius: "8px",
    padding: "12px",
  },
  namesSideHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  namesOutput: {
    width: "100%",
    height: "100%",
    minHeight: "220px",
    backgroundColor: "#1E293B",
    border: "1px solid #334155",
    borderRadius: "6px",
    color: "#38BDF8",
    padding: "10px",
    boxSizing: "border-box",
    fontSize: "13px",
    fontFamily: "monospace",
    outline: "none",
    resize: "none",
  },
  detailsBlock: {
    marginBottom: "8px",
    borderLeft: "2px solid #334155",
    paddingLeft: "8px",
  },
  summaryTitle: {
    cursor: "pointer",
    userSelect: "none",
    outline: "none",
    padding: "2px 0",
  },
  codePre: {
    margin: "4px 0 0 0",
    color: "#A7F3D0",
    whiteSpace: "pre-wrap",
    fontFamily: "inherit",
  },
};