document.addEventListener("DOMContentLoaded", () => {
    const arfolyamLista = {
        USD: { EUR: 0.92, HUF: 360, CHF: 0.89, JPY: 130 },
        EUR: { USD: 1.09, HUF: 390, CHF: 0.97, JPY: 140 },
        HUF: { USD: 0.0028, EUR: 0.0026, CHF: 0.0024, JPY: 0.35 },
        CHF: { USD: 1.12, EUR: 1.03, HUF: 420, JPY: 145 },
        JPY: { USD: 0.0077, EUR: 0.0071, HUF: 2.85, CHF: 0.0069 }
    };
    
    const penznemek = Object.keys(arfolyamLista);
    const forrasSelect = document.getElementById("forrasPenznem");
    const celPenznemContainer = document.getElementById("celPenznemContainer");
    const hozzaadGomb = document.getElementById("hozzaad");
    const eredmenyKartya = document.getElementById("eredmenyKartya");
    const valutaValtoGomb = document.getElementById("valutaValto");
    const torlesGomb = document.getElementById("alaphelyzet");
    
    penznemek.forEach(penz => {
        let option1 = new Option(penz, penz);
        forrasSelect.add(option1);
    });
    
    hozzaadGomb.addEventListener("click", () => {
        const newSelect = document.createElement("select");
        newSelect.classList.add("form-select", "celPenznem", "mt-2");
        penznemek.forEach(penz => {
            let option = new Option(penz, penz);
            newSelect.add(option);
        });
        celPenznemContainer.appendChild(newSelect);
    });
    
    valutaValtoGomb.addEventListener("click", () => {
        const forrasPenznem = forrasSelect.value;
        const osszeg = parseFloat(document.getElementById("osszeg").value);
        
        eredmenyKartya.innerHTML = "";
        document.querySelectorAll(".celPenznem").forEach(celSelectElem => {
            const celPenznem = celSelectElem.value;
            if (arfolyamLista[forrasPenznem] && arfolyamLista[forrasPenznem][celPenznem]) {
                const atvaltottOsszeg = (osszeg * arfolyamLista[forrasPenznem][celPenznem]).toFixed(2);
                eredmenyKartya.innerHTML += `
                    <div class="card text-white bg-success mb-3">
                        <div class="card-body">
                            <p>${osszeg} ${forrasPenznem} = ${atvaltottOsszeg} ${celPenznem}</p>
                        </div>
                    </div>`;
            }
        });
    });
    
    torlesGomb.addEventListener("click", () => {
        document.getElementById("osszeg").value = "1";
        celPenznemContainer.innerHTML = "";
        eredmenyKartya.innerHTML = "";
    });
});