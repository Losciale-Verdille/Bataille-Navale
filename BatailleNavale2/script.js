let plateau=[];
let compteur=0;//remplir le plateau
let edition=true; //pour placer les bateaux au debut
while(plateau.length !=100){//remplir le plateau
	plateau[compteur]=0;
	compteur++;
}

let bt1 = new Object(); let bt2 = new Object(); let bt3 = new Object(); let bt4 = new Object(); let bt5 = new Object(); let bt6 = new Object();
bt1.size = 5; bt2.size = 4; bt3.size = 3; bt4.size = 3; bt5.size = 2; bt6.size = 2; //longueur de chaque bateau
bt1.id=1; bt2.id=2; bt3.id=3; bt4.id=4; bt5.id=5; bt6.id =6;
let flotte=[bt1,bt2,bt3,bt4,bt5,bt6];
let current_edit = 0; //stocker l'id du bateau en train d'être placé
let case1=null;
	
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
//-1=tiré; 0=rien; 1,2,...=bateau
	function jouer(id){
		if (edition) { // on place les bateaux?
			if(case1 ==null){ // stocke la premiere case
				case1=id;
			}else{ // stoche la 2eme case
				if ( Math.abs(id-case1)== flotte[current_edit].size-1) { //si longueur egale à celle du bateau qu'on pose en longueur
					console.log("longueur");
					if (id<case1) { // intervertit au cas où on met les 2 cotes
						case1=id;
						id=case1+flotte[current_edit].size-1;
					}
					for (var i = case1; i <= id; i++) { // on met image + plateau a jour
						plateau[i]=flotte[current_edit].id;
						document.getElementById(i).style.backgroundColor = "grey";
					}
					current_edit++;
					case1=null
				}else if (Math.abs(id-case1)== (flotte[current_edit].size-1) *10) {//si longueur egale à celle du bateau qu'on pose en hauteur
					console.log("hauteur");
					if (id<case1) {
						case1=id;
						id=case1+(flotte[current_edit].size-1)*10;
					}
					for (var i = case1; i <= id; i+=10) {
						plateau[i]=flotte[current_edit].id;
						document.getElementById(i).style.backgroundColor = "grey";
					}	
					case1=null
					current_edit++;
				}else{// position trop grand
					alert("replace 2ème case");
				}
				if (current_edit==6) { // on joue après avoir mis les 6 bateaux
					edition=false;
				}
			}
			

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