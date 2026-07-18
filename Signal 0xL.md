# Signal 0xL — Arc Testnet

### Tabla de Contenidos
1. [GM Diario](#1-gm-diario)
2. [Análisis de Compromiso (Nodo 1)](#2-análisis-de-compromiso-nodo-1)
3. [Análisis de Convicción (Nodo 2)](#3-análisis-de-convicción-nodo-2)
4. [Análisis de Legado (Nodo 3)](#4-análisis-de-legado-nodo-3)
5. [Runestone (Nodo Central)](#5-runestone-nodo-central)
6. [Tabla de Estatus](#6-tabla-de-estatus)
7. [Análisis de Red](#7-análisis-de-red)

---

## Introducción

**Signal** es una plataforma Web3 diseñada para aportar valor tanto a los usuarios como a la infraestructura de la red en la que opera. Su objetivo principal es visibilizar datos clave sobre la interacción individual de cada cartera y el estado general de la blockchain. Cada botón de interacción dentro de la plataforma en **Arc Testnet** tendrá un costo simbólico de **0.01 USD**, pagadero en el token nativo de la red.

---

## 1. GM Diario

El **"GM Diario"** es una interacción de bajo costo y sin necesidad de aprobaciones previas (*Zero-Approval*), a la cual denominamos **"Signal"**. Esta acción envía una transacción a la blockchain para dejar una huella digital inmutable, aportando valor tanto a la infraestructura en cadena como al historial del usuario mediante las siguientes mecánicas:

* **Ventana Horaria:** El sistema opera bajo un rango de horario estricto UTC (00:00 - 23:59).
* **Validación en Cadena:** La verificación del horario se gestiona de forma determinista dentro del contrato inteligente.
* **Control de Duplicados:** El botón en el frontend se deshabilita tras su uso y el contrato bloquea cualquier intento de repetición con la misma cartera dentro del rango de 24 horas establecido.
* **Puntuación Base:** Cada interacción de GM exitosa suma **+1 punto base** al estatus del usuario.
* **Tarifa Dinámica:** Cada GM tiene un costo base de **0.01 USD**, cobrado en la moneda nativa de la red calculando la equivalencia de un centavo de dólar en tiempo real.
* **Mecánica de Racha y Deuda:** Si se interrumpe la constancia diaria, el usuario pierde su racha activa. Sin embargo, es posible recuperarla pagando una penalización de estatus y liquidando la deuda acumulada por los días inactivos a razón de **+0.01 USD por cada día fallido**.
* **Penalización de Estatus (Bifurcaciones):** Al perder la racha, la cartera recibe la insignia **"B2" (Bifurcación 2)**. Cada vez que el usuario olvide realizar su GM diario, podrá recuperar su racha ascendiendo un nivel en su bifurcación (B3, B4, B5, etc.).
* **Beneficio Oculto de la Bifurcación:** A partir de la bifurcación B2, la activación de los botones de los nodos pasa a ser gratuita. Esta mecánica es una ventaja estratégica que el usuario descubrirá al perder su racha o mediante la comunicación de la comunidad.
* **Escala Progresiva de Costos:**
  * **B1 (VIP):** Insignia de máximo estatus donde cada GM cuesta la tarifa base de **0.01 USD**.
  * **B2:** Costo de **0.015 USD** por GM (0.01 USD base + 0.005 USD de penalización).
  * **B3:** Costo de **0.020 USD** por GM (0.01 USD base + penalización de 2 niveles: 0.01 USD adicionales).
  * **B4 en adelante:** El costo escala en **+0.005 USD** adicionales por cada nivel de bifurcación superado.

---

## 2. Análisis de Compromiso (Nodo 1)

Este nodo evalúa el volumen histórico de transacciones realizadas por la cartera hasta la fecha, ponderando el peso y la complejidad de cada una.

* **Bonificación por Estructura:** Se otorgará un bonificador de puntos basado en los *slots* o el peso constructivo de las transacciones ejecutadas.
* **Multiplicador Variable:** El factor exacto de multiplicación para los puntos de la cartera se definirá y ajustará estratégicamente en función de esta métrica.
* **Requisitos de Activación:** El nodo se desbloquea de forma natural al alcanzar el **día 3 de racha** continua. Alternativamente, el usuario puede activarlo de forma instantánea pagando una tarifa de **0.50 USD** (sumado al costo base de 0.01 USD de la transacción).

> **Nota:** La activación de este módulo permite visibilizar el gasto histórico total de gas en la red e integra plenamente a la cartera en la dinámica analítica de la plataforma.

---

## 3. Análisis de Convicción (Nodo 2)

Este módulo evalúa el balance de los activos principales en posesión de la cartera, priorizando el token nativo y, en su caso, el token de gobernanza de la red.

* **Ratio de Suministro:** El contrato calcula el porcentaje de posesión de la cartera frente al suministro total (*supply*) del activo.
* **Adaptabilidad de Red:** El sistema se adapta a la arquitectura económica actual de la red, distinguiendo si existe un token de gobernanza activo o si opera exclusivamente con moneda nativa.
* **Evolución Futura:** En fases posteriores, el análisis podrá integrar otros tokens fungibles o NFT, dependiendo de la adopción y las dinámicas del proyecto frente a la comunidad.
* **Requisitos de Activación:** El acceso natural se desbloquea al alcanzar el **día 12 de racha**. Para activarlo de forma inmediata, el usuario puede realizar un pago instantáneo de **1.25 USD** (sumado al costo base de 0.01 USD).

---

## 4. Análisis de Legado (Nodo 3)

Mide la antigüedad y constancia histórica de la cartera analizando la marca de tiempo de su primera interacción en la red. Se otorga una ponderación significativamente mayor a los pioneros que participaron durante el primer día, semana o mes.

* **Ventaja de Adopción Temprana:** Dado que Arc Testnet es una red de creación reciente, haber interactuado desde sus fases iniciales aportará un peso decisivo en el puntaje de señal dentro de la dApp.
* **Valoración de Huellas:** Se valora la primera interacción sin importar si fue un intercambio simple (*swap*) o la ejecución de un contrato complejo. Asimismo, se mide la constancia temporal evaluando el intervalo entre la primera y la última transacción registrada.
* **Penalización por Abandono:** Si un usuario realizó una transacción el primer día pero mantuvo su cartera inactiva durante meses, su señal disminuirá gradualmente, aunque conservará el prestigio histórico de haber sido pionero.
* **Ejemplo de Intervalo Temporal:** Una cartera en Ethereum con actividad entre 2015 y 2022 (rango de 7 años) tendrá un peso elevado. Sin embargo, una cartera activa entre 2018 y 2026 (rango de 8 años) obtendrá una puntuación superior en constancia debido al periodo continuo de actividad.
* **Insignias de Legado:** Los usuarios recibirán insignias especiales asociadas a su llegada histórica a la red (Primer Día, Primera Semana, Primer Mes, Primer Año, y hitos por décadas: 10, 20, 30 o 40 años), cada una con un multiplicador de puntaje exclusivo.
* **Requisitos de Activación:** Se desbloquea de forma natural al alcanzar el **día 25 de racha**. También puede activarse al instante pagando **5.00 USD** (sumado al costo base de 0.01 USD).

> **Nota de Legado:** Aunque el rango entre transacciones demuestra un compromiso activo y es altamente valorado, los primeros usuarios siempre quedarán enmarcados en la memoria histórica de **Signal 0xL** mediante multiplicadores asignados a su grupo de antigüedad.

---

## 5. Runestone (Nodo Central)

Es el módulo central que desbloquea el **"Super GM"**, un potenciador de racha que duplica la recompensa diaria a **+2 puntos por interacción** en lugar del punto base habitual. Se activa automáticamente cuando los tres nodos previos (Compromiso, Convicción y Legado) se encuentran operativos.

* **Reglas del Super GM:** Mantiene exactamente el mismo costo base y las mismas penalizaciones progresivas por pérdida de racha que el GM normal. La única modificación operacional es la bonificación en la acumulación de puntos.
* **Pérdida y Reseteo del Potenciador:** Si el usuario pierde su racha estando en Super GM, revertirá al estado de GM normal y deberá pagar la deuda de días inactivos (0.01 USD por cada día faltante + el día actual) para restaurarla.
* **Reactivación de Nodos:** Al perder la racha, los botones de los nodos se desactivan. Para reactivar el Super GM, se deberán volver a activar los tres nodos, lo cual restaurará el potenciador sin importar el nivel de bifurcación actual.
* **Retorno a Estatus VIP:** Si un usuario en una bifurcación alta (ej. B20) desea recuperar la insignia **B1 (VIP)**, deberá resetear voluntariamente su racha a cero.
* **Tarifas en Reseteo VIP:** Al reiniciar la racha para volver a VIP, el usuario deberá conseguir nuevamente los días de racha requeridos (3, 12 y 25 días) o pagar las tarifas instantáneas de desbloqueo para reactivar los nodos, independientemente de si ya los había desbloqueado en el pasado.
* **Costos Base en Nodos:** Los tres nodos analíticos siempre conservarán un costo base intransferible de **0.01 USD** en cada interacción, sin importar si se desbloquearon por racha o mediante pago instantáneo. En los estados de bifurcación (B2 en adelante), aunque el botón de nodo en sí es gratuito, la transacción siempre exigirá el pago de dicho costo base de 0.01 USD.

---

## 6. Tabla de Estatus

La clasificación general posiciona a las carteras de la comunidad ordenadas estrictamente por su **puntaje total acumulado**, el cual es resultado de sumar los puntos de GM diario y los potenciadores de los nodos de Compromiso, Convicción y Legado.

* **Jerarquía por Puntos:** El ranking premia el puntaje acumulado y no la racha activa del momento. Aunque la constancia incrementa las probabilidades de liderar la tabla, el diseño permite que un usuario en bifurcación alta (ej. B20) pueda competir y alcanzar el **TOP 1** del ranking.
* **Función de las Bifurcaciones:** Las insignias de bifurcación cumplen la función de proteger el progreso y modular los costos del GM, pero no limitan la capacidad competitiva del puntaje si la cartera posee un Legado histórico de gran peso.
* **Identidad en Cadena:** En la fase inicial, el ranking mostrará únicamente la abreviatura criptográfica de la cartera. En actualizaciones futuras, los usuarios tendrán la opción de vincular y visualizar sus dominios Web3 o redes sociales asociadas (como X).

---

## 7. Análisis de Red

La plataforma integrará un instrumento de validación técnica que medirá las métricas vitales de la infraestructura de red en tiempo real. Se monitorearán variables como la velocidad de procesamiento (TPS), los costos promedio de gas y el historial de bloques confirmados, brindando a la comunidad una herramienta confiable para evaluar la estabilidad operativa de **Arc Testnet**.
