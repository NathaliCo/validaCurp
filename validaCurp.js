document.getElementById('file-input').addEventListener('change', leerArchivo, false);

//Lee el archivo
function leerArchivo(e) {
  
  const archivo = e.target.files[0];
    if (!archivo) {
    return;
  }
  if (archivo.name.slice(0-3)==="txt"){
  let lector = new FileReader();
  lector.onload = function(e) {
    const contenido = e.target.result;
    extraerLineas(contenido);
  };
  lector.readAsText(archivo);
}else{
  alert("Seleccione un archivo con extensión .txt")
}
}

//Guarda cada curp en un array
function extraerLineas(contenido) {
  const lineas = contenido.split('\n');
  lineas.forEach(element => {
    revisaCurp(element);
  });   
  resultados.innerHTML+=("<h3><b>" + validas + " correctas y " + invalidas + " incorrectas" + "</br> </b></h3>");
}

let validas=0;
let invalidas=0;
let resultados =  document.querySelector("#showResults");
//Valida cada curp
function revisaCurp(curp) {
    let element = curp
        .replace(/[&\/\#,+()$~%'":*?<>{}|]/g, "")
        .replace(/\u201C/g, "")
        .replace(/\u201D/g, "")
        .replace(/\s+/g, "");
        if (curp != "") {
      element = element.toUpperCase();
      if (element.length < 18) {
       resultados.innerHTML+=(element + " No es una curp válida porque no tiene los 18 dígitos necesarios (espacios y caracteres especiales no son válidos)" + "</br></br>");
        invalidas++;
      } else if (element.length > 18) {
        resultados.innerHTML+=( element + " No es una curp válida porque supera los 18 dígitos requeridos" + "</br></br>");
        invalidas++;
      } else {
        let curp =
          "^(([A-Z][AEIOU][A-ZÑ&]{2})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][0-9])|[3][01])([M]|[H])((AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|OC|PL|QO|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS))([^AEIOU0-9]{3})([A-Z0-9])([0-9]))|" +
          "(([A-Z][AEIOU][A-ZÑ&]{2})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][0-9])|[3][0])([M]|[H])((AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|OC|PL|QO|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS))([^AEIOU0-9]{3})([A-Z0-9])([0-9]))|" +
          "(([A-Z][AEIOU][A-ZÑ&]{2})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][0-9])([M]|[H])((AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|OC|PL|QO|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS))([^AEIOU0-9]{3})([A-Z0-9])([0-9]))|" +
          "(([A-Z][AEIOU][A-ZÑ&]{2})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([M]|[H])((AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|OC|PL|QO|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS))([^AEIOU0-9]{3})([A-Z0-9])([0-9]))$";
        if (element.match(curp)) {
          resultados.innerHTML+=(element + " Es una curp correcta" + "</br></br>");
          validas++;
        } else {
            invalidas++
          const first = element.slice(0, -14);
          curp = /^[A-ZÑ&][AEIOU][A-ZÑ&]{2}/;
        
          if (first.match(curp)) {
            const second = element.slice(4, -8);
            curp =
              "(([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][0-9])|[3][01]))|" +
              "(([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][0-9])|[3][0]))|" +
              "(([02468][048]|[13579][26])[0][2]([0][1-9]|[12][0-9]))|" +
              "(([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8]))$";
            if (second.match(curp)) {
              curp = "([M]|[H])";
              const thirds = element.slice(10, 11);
              if (thirds.match(curp)) {
                const fourth = element.slice(11, 13);
                curp = "((AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|OC|PL|QO|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS))";
                if (fourth.match(curp)) {
                  const fifth = element.slice(12, 15);
                  curp = "([^AEIOU0-9]{3})";
                  if (fifth.match(curp)) {
                    const sixth = element.slice(16, 17);
                    curp = "([A-Z0-9])";
                    if (sixth.match(curp)) {
                      const seventh = element.slice(17);
                      curp = "([0-9])";
                      if (seventh.match(curp)) {
                      } else {
                        resultados.innerHTML+=(element + " Es una curp incorrecta, revisa el últumo dígito, debe ser un número" + "</br></br>");
                      }
                    } else {
                      resultados.innerHTML+=(element + " Es una curp incorrecta revise el digito 17 debe ser un numero o una letra" + "</br></br>");
                    }
                  } else {
                    resultados.innerHTML+=(element + " es una curp incorrecta revise los dígitos del 14 al 16 deben corresponder a la primer consonante interna del primer apellido, del segundo y de su primero nombre" + "</br></br>");
                  }
                } else {
                  resultados.innerHTML+=(element + " Es una curp incorrecta revise los dígitos 12 y 13, deben corresponder a las siglas de su entidad federativa de nacimiento https://es.wikipedia.org/wiki/Anexo:Abreviaturas_en_México" + "</br></br>");
                }
              } else {
                resultados.innerHTML+=(element + " Es una curp incorrecta, revise el dígito 11 de su curp debe ser una H (hombre) o M mujer" + "</br></br>");
              }
            } else {
              resultados.innerHTML+=(element + " No es una curp correcta verifique su fecha de nacimiento en los dígitos del 5 al 10 debe tener el siguiente formato aa/mm/dd" + "</br></br>");
            }
          } else {
            resultados.innerHTML+=(element + " es incorrecto, verifique los primeros 4 dígitos, éstos corresponden a la inicial y primer vocal interna del primer apellido; segunda inicial del segundo apellido e inicial del nombre" + "</br></br>");
          }
        }
      }
}
}