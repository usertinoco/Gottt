// ==========================================
// SECCIÓN 1: ALGORITMOS CONDICIONALES (1 AL 3)
// ==========================================

// 1. Liquidación de comisión por ventas[cite: 1]
function ejecutarComisionVentas() {
    let nombre = prompt("Ingrese el nombre del vendedor:");
    let ventas = parseFloat(prompt("Ingrese el valor total de ventas en el mes ($):"));
    let antiguedad = parseInt(prompt("Ingrese los años de antigüedad en la empresa:"));

    if (!nombre || isNaN(ventas) || isNaN(antiguedad) || ventas < 0 || antiguedad < 0) {
        alert("Error: Ingrese datos válidos.");
        return;
    }

    let porcComision = 0;
    
    // Proceso condicional
    if (ventas >= 8000000 && antiguedad >= 2) {
        porcComision = 10;
    } else if (ventas >= 3000000) {
        porcComision = 5;
    } else {
        porcComision = 0;
    }

    let comision = ventas * (porcComision / 100);

    let res = `Vendedor: ${nombre}\n` +
              `Ventas Realizadas: $${ventas.toLocaleString()}\n` +
              `Comisión: ${porcComision}%\n` +
              `Valor Comisión: $${comision.toLocaleString()}`;

    document.getElementById("out-comision").innerText = res;
    alert(res);
}

// 2. Clasificación de una solicitud de préstamo[cite: 2]
function ejecutarPrestamo() {
    let nombre = prompt("Ingrese el nombre del solicitante:");
    let ingresos = parseFloat(prompt("Ingrese los ingresos mensuales ($):"));
    let gastos = parseFloat(prompt("Ingrese los gastos mensuales ($):"));
    let historial = prompt("¿El historial crediticio es POSITIVO o NEGATIVO?").trim().toLowerCase();

    if (!nombre || isNaN(ingresos) || isNaN(gastos)) {
        alert("Error: Por favor complete los montos numéricos correctamente.");
        return;
    }

    let disponible = ingresos - gastos;
    let resultado = "";

    // Proceso condicional
    if (ingresos <= gastos) {
        resultado = "Rechazada por capacidad de pago insuficiente.";
    } else if (historial === "negativo") {
        resultado = "Rechazada por historial crediticio.";
    } else if (historial === "positivo" && disponible >= 1000000) {
        resultado = "Preaprobada.";
    } else {
        resultado = "Pendiente de revisión.";
    }

    let res = `Solicitante: ${nombre}\n` +
              `Dinero Disponible: $${disponible.toLocaleString()}\n` +
              `Resultado: ${resultado}`;

    document.getElementById("out-prestamo").innerText = res;
    alert(res);
}

// 3. Cálculo de tarifa de alojamiento[cite: 2, 3]
function ejecutarAlojamiento() {
    let nombre = prompt("Ingrese el nombre del huésped:");
    let tipoHabitacion = prompt("Tipo de habitación (estandar, ejecutiva, suite):").trim().toLowerCase();
    let temporada = prompt("Temporada (alta, baja):").trim().toLowerCase();
    let noches = parseInt(prompt("Número de noches reservadas:"));

    let tarifaBase = 0;
    if (tipoHabitacion === "estandar") tarifaBase = 150000;
    else if (tipoHabitacion === "ejecutiva") tarifaBase = 250000;
    else if (tipoHabitacion === "suite") tarifaBase = 400000;

    if (tarifaBase === 0 || (temporada !== "alta" && temporada !== "baja") || isNaN(noches) || noches <= 0) {
        let msgErr = "Error: Opciones o datos ingresados no válidos.";
        alert(msgErr);
        document.getElementById("out-alojamiento").innerText = msgErr;
        return;
    }

    // Recargo por temporada alta (20%)
    let tarifaNoche = (temporada === "alta") ? tarifaBase * 1.20 : tarifaBase;
    let costoSubtotal = tarifaNoche * noches;
    
    // Descuento por 5 noches o más (10%)
    let descuento = (noches >= 5) ? costoSubtotal * 0.10 : 0;
    let totalPagar = costoSubtotal - descuento;

    let res = `Huésped: ${nombre}\n` +
              `Tarifa por Noche: $${tarifaNoche.toLocaleString()}\n` +
              `Costo Antes de Descuento: $${costoSubtotal.toLocaleString()}\n` +
              `Descuento Aplicado: $${descuento.toLocaleString()}\n` +
              `Total a Pagar: $${totalPagar.toLocaleString()}`;

    document.getElementById("out-alojamiento").innerText = res;
    alert(res);
}


// ==========================================
// SECCIÓN 2: ALGORITMOS CON BUCLES (4 AL 6)
// ==========================================

// 4. Registro de ventas de una jornada[cite: 4]
function ejecutarRegistroVentas() {
    let cantVentas = parseInt(prompt("¿Cuántas ventas se realizaron en la jornada?"));

    if (isNaN(cantVentas) || cantVentas <= 0) {
        alert("Error: Ingrese una cantidad válida de ventas.");
        return;
    }

    let totalVendido = 0;
    let mayores200k = 0;
    let ventaMayor = 0;

    for (let i = 1; i <= cantVentas; i++) {
        let valorVenta = parseFloat(prompt(`Ingrese el valor de la venta #${i}:`));
        while (isNaN(valorVenta) || valorVenta <= 0) {
            valorVenta = parseFloat(prompt(`Monto inválido. Ingrese de nuevo la venta #${i}:`));
        }

        totalVendido += valorVenta;
        if (valorVenta > 200000) mayores200k++;
        if (valorVenta > ventaMayor) ventaMayor = valorVenta;
    }

    let promedio = totalVendido / cantVentas;

    let res = `--- Resumen de la Jornada ---\n` +
              `Cantidad de Ventas: ${cantVentas}\n` +
              `Total Recaudado: $${totalVendido.toLocaleString()}\n` +
              `Promedio por Venta: $${promedio.toFixed(2)}\n` +
              `Ventas mayores a $200.000: ${mayores200k}\n` +
              `Venta más alta: $${ventaMayor.toLocaleString()}`;

    document.getElementById("out-registro-ventas").innerText = res;
    alert(res);
}

// 5. Control de inventario de una tienda[cite: 4]
function ejecutarInventario() {
    let producto = prompt("Ingrese el nombre del producto:");
    let inventario = parseInt(prompt("Ingrese la cantidad inicial del inventario:"));

    if (!producto || isNaN(inventario) || inventario <= 0) {
        alert("Error: Ingrese datos de inventario válidos.");
        return;
    }

    let unidadesVendidasTotal = 0;
    let operacionesValidas = 0;

    while (inventario > 0) {
        let venta = parseInt(prompt(`Stock disponible: ${inventario}.\nIngrese unidades a vender:`));

        if (isNaN(venta) || venta <= 0) {
            alert("Cantidad inválida. Ingrese un valor mayor a cero.");
            continue;
        }

        if (venta > inventario) {
            alert(`No hay stock suficiente para vender ${venta} unidades. Quedan: ${inventario}`);
        } else {
            inventario -= venta;
            unidadesVendidasTotal += venta;
            operacionesValidas++;
            alert(`Venta exitosa. Stock restante: ${inventario}`);
        }
    }

    let res = `--- Inventario Agotado ---\n` +
              `Producto: ${producto}\n` +
              `Total Unidades Vendidas: ${unidadesVendidasTotal}\n` +
              `Operaciones Válidas: ${operacionesValidas}\n` +
              `Inventario Final: ${inventario}`;

    document.getElementById("out-inventario").innerText = res;
    alert(res);
}

// 6. Registro y análisis de temperaturas[cite: 4, 5]
function ejecutarTemperaturas() {
    let dias = parseInt(prompt("¿Cuántos días de temperatura va a registrar?"));

    if (isNaN(dias) || dias <= 0) {
        alert("Error: Ingrese una cantidad de días válida.");
        return;
    }

    let sumaTemperaturas = 0;
    let tempMaxima = -Infinity;
    let tempMinima = Infinity;
    let diasAltos30 = 0;

    for (let i = 1; i <= dias; i++) {
        let temp = parseFloat(prompt(`Ingrese la temperatura (°C) para el día #${i}:`));
        while (isNaN(temp)) {
            temp = parseFloat(prompt(`Valor inválido. Ingrese la temperatura del día #${i}:`));
        }

        sumaTemperaturas += temp;
        if (temp > tempMaxima) tempMaxima = temp;
        if (temp < tempMinima) tempMinima = temp;
        if (temp > 30) diasAltos30++;
    }

    let promedio = sumaTemperaturas / dias;

    let res = `--- Informe Meteorológico ---\n` +
              `Días Registrados: ${dias}\n` +
              `Temperatura Promedio: ${promedio.toFixed(1)}°C\n` +
              `Temperatura Máxima: ${tempMaxima}°C\n` +
              `Temperatura Mínima: ${tempMinima}°C\n` +
              `Días con Temp > 30°C: ${diasAltos30}`;

    document.getElementById("out-temperaturas").innerText = res;
    alert(res);
}