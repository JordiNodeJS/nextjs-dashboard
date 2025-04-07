// Crear una instancia de URLSearchParams
const params = new URLSearchParams();

// Añadir múltiples valores con "append"
params.append("clave", "valor1");
params.append("clave", "valor2");

// Sobrescribir los valores con "set"
params.set("clave", "valor3");

// Mostrar el resultado final
console.log(params.toString()); // Resultado: "clave=valor3"

// Agregar un ejemplo adicional: iterar sobre los parámetros
params.append("otraClave", "otroValor");
for (const [key, value] of params) {
  console.log(`${key}: ${value}`);
}
console.log(params.get("otraClave"))
