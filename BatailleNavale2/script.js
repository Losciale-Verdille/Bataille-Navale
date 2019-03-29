
	let plateau=[];
	let compteur=0;//remplir le plateau
	let edition=false; //pour placer les bateaux au debut
	while(plateau.length !=100){//remplir le plateau
		plateau[compteur]=0;
		compteur++;
	}
	
	function genereTableau(){
		let texte="<table class='table'>";
		for (let i = 0; i <10; i++) {
			texte+="<tr>";
			for (let j = 0;j<10; j++) {
				texte += "<td class='td' onclick='jouer("+(10*i+j)+")' id='"+(10*i+j)+"'>";
			}
			texte+="</tr>";
		}
		texte+="</table>";
		document.getElementById("jeu").innerHTML= texte;
	}

	function jouer(id){
		if (edition) {

		}else{
			if (plateau[id]!=-1) {
				if (plateau[id]!=0){
					document.getElementById(id).innerHTML='<center><img src="Boom.png"><center>';
				}else{
					document.getElementById(id).innerHTML='<center><img src="rate.png"><center>';
				}
				plateau[id]=-1;
			}
			else{
				alert("refaire");
			}
		}
	}

window.onload = genereTableau;
