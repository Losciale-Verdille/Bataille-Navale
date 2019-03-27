
	// place un message d'erreur comme contenu de l'élément
	// d'id 'tooltip' et rend cet élément visible
	function genereTableau(){
		let texte="<table class='table'>";
		for (let i = 0; i <10; i++) {
			texte+="<tr>";
			for (let j = 0;j<10; j++) {
				texte += "<td class='td' id='"+(10*i+j)+"'>";
			}
			texte+="</tr>";
		}
		texte+="</table>";
		console.log(texte);
		document.getElementById("jeu").innerHTML= texte;
	}

window.onload = genereTableau;
