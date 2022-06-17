
var TARIFURL="https://www.laser13.fr/tarif.php";
var PUSHURL="https://www.laser13.fr/majpush.php"; // stocker id push
var BONUSURL="https://www.laser13.fr/centre/bonus.php";
var NEWSURL="https://www.laser13.fr/a.php";
var MAJURL="https://www.laser13.fr/maj.php"; //permet de savoir quel fichier a mettre a jour
var LOGINURL="https://www.laser13.fr/b.php"; //connection
var CONTACTURL="https://www.laser13.fr/contact.php";
var FIDELITEURL="https://www.laser13.fr/centre/index.php?mail=";
var CREECOMPTEURL="https://www.laser13.fr/creecompte.php";
var MISEAJOURCOMPTE="https://www.laser13.fr/miseajourcompte.php";
var RECUPURL = "https://www.laser13.fr/centre/recup_mail.php";
var tarifidrecu;
var newsidrecu;
var contactidrecu;
var regid;


function maj(){

  $.ajax({
url: MAJURL,
type: "POST",
   timeout: 10000,
dataType:'json',

success: function(data){
tarifidrecu=data.result.tarifid;
newsidrecu=data.result.newsid;
contactidrecu=data.result.contactid;


}});	

}
var app = {
    // Application Constructor
    initialize: function() {

        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener("resume", this.onResume, false);

       document.addEventListener('pause', this.onPause, false);

    },
    // deviceready Event Handler
    //
	
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		 
	ons.disableAutoStatusBarFill() ;
	
	
	if(typeof(Keyboard) != 'undefined') {
	Keyboard.hideFormAccessoryBar(true);
    }
	
    app.receivedEvent('deviceready');
		
var plateos=(navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : "null";
window.localStorage.setItem("os", plateos);

//?"IOS" : "ANDROID";
		 //   window.open = cordova.InAppBrowser.open;

        ons.setDefaultDeviceBackButtonListener(function() {
            if (navigator.notification.confirm("Voulez vous quitter?", 
                function(index) {
                    if (index == 1) { // OK button
                        navigator.app.exitApp(); // Close the app
                    }
                }
            ,"Laser13"),["Oui","Non"] );
        });
/*
        // Open any external link with InAppBrowser Plugin
        $(document).on('click', 'a[href^=http], a[href^=https]', function(e){

            e.preventDefault();
            var $this = $(this); 
            var target = $this.data('inAppBrowser') || '_system'; //'_blank';

            window.open($this.attr('href'), target);

        });
        */
		



	
if(1) {

FCM.getToken(function(token){
plateos=window.localStorage.getItem("os");
window.localStorage.setItem("pushid", token);
regid=token;
alert(token);
 var user = " ";
  
	 user = window.localStorage.getItem("user");
if (user)
  $.ajax({
url: PUSHURL,
 timeout: 10000,
type: "POST",
dataType: 'json',
data: {username: user, regid:regid, os:plateos},
success: function(data){

		 

}})
	
	
});


FCM.onTokenRefresh(function(token){
plateos=window.localStorage.getItem("os");

window.localStorage.setItem("pushid", token);
regid=token;
 var user = " ";
  
	 user = window.localStorage.getItem("user");
if (user)
  $.ajax({
url: PUSHURL,
type: "POST",
 timeout: 10000,
dataType: 'json',
data: {username: user, regid:regid, os:plateos},
success: function(data){

		 

}})

});



FCM.onNotification(function(data){
//alert(JSON.stringify(data));
 if(data.wasTapped){
    
	
				if (data.page != null){ 
				var b=window.localStorage.getItem("Login");
				if (b!=null){
				var a = JSON.parse(b);
				var email = a.email;

				$.ajax({
				
				url: data.page,
				 timeout: 10000,
				type: "POST",
				dataType:'json',
				data: {mail: email},
				success: function(page){
				// var bonus=JSON.parse(data2);
				ons.notification.alert(
				{
				title:page.result.titre,
				messageHTML: decodeURI(page.result.message)
	});

					}})
					
					}
					
					}
					
    }else{
     
    
	
	
 ons.notification.alert({
              message: data.body,         // message
              title: data.title,           // title
                 // buttonName
           
			
			 callback: function() {
				if (data.page != null){ 
				var b=window.localStorage.getItem("Login");
				if (b!=null){
				var a = JSON.parse(b);
				var email = a.email;

				$.ajax({
				url: data.page,
				 timeout: 10000,
				type: "POST",
				dataType:'json',
				data: {mail: email},
				success: function(page){
				// var bonus=JSON.parse(data2);
				ons.notification.alert(
				{
				title:page.result.titre,
				messageHTML: decodeURI(page.result.message)
	});

					}})
					
					}
					
					}}

					
	   });
	   
	   }
	



});


}

	//push
        
    },

onPause: function() {
        app.receivedEvent('pause');
	//alert("redemarrage");
	//window.localStorage.setItem("context", app);
	
	//app = window.localStorage.getItem("context");


	//	location.reload(); 
    // Handle the resume event
} ,
	
onResume: function() {
        app.receivedEvent('resume');
	//alert("redemarrage");

	//app = window.localStorage.getItem("context");



	//	location.reload(); 
    // Handle the resume event
} , 
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);
    }
        
    
		
		





    
};


var  selectedItem;
(function(){
ons.bootstrap()


   .controller( 'NewsController' , function($scope) {
       ons.ready(function() {
		
	  $scope.news = [];
        
        var getData = function ($done) {
		  
		 $.ajax({
url: NEWSURL,
 timeout: 10000,
type: "GET",
dataType: 'json',
//data: {username: user, password: pass},
success: function(data){

//var data=JSON.parse(datarecu);

if ($done) { $done(); }
        
		$scope.$apply(function() {
            //wrapped this within $apply
          $scope.news = data.result;
		  $scope.chargnews=false;
          });
		  
           
				window.localStorage.setItem("news", JSON.stringify(data.result));
				window.localStorage.setItem("newsid", JSON.stringify(data.id));
				newsidrecu=data.id;
            },//});
			
			
error: function(data) {
                
                if ($done) { $done(); 
				$scope.chargnews=false;
				}

            }});


        
        }
         
		if(1) { 
		 FCM.subscribeToTopic('laser13');
			
		}
         //      $scope.letterLimit = NewsData.letterLimit;		 
			var a=window.localStorage.getItem("news");
			$scope.news = JSON.parse(a);
			//alert(a);
		var newsid=window.localStorage.getItem("newsid") ;	
        // Initial Data Loading

 if ( newsid != newsidrecu || newsid==null)  
		{
	//	alert (newsid +" "+newsidrecu);
		//$scope.$apply(function() {
		  $scope.chargnews=true;
          //});
		  getData();
		  }

        $scope.load = function($done) {
		 
         
            getData($done);
        };
        
        $scope.showDetail = function(index) {
		
        selectedItem = $scope.news[index];
       // NewsData.selectedItem = selectedItem;
        $scope.appNavigator.pushPage('new.html',{ animation: "none" });
        }
        
	
	
	  });
    })
	
	
   .controller( 'NewController' , function( $scope ) {
      ons.ready(function() { 
	  
	   $scope.item = selectedItem;
		//$scope.item.lien.src = "<H1>kikoo</H1>";
		document.getElementById('desc').innerHTML = decodeURI(selectedItem.lien);
    //  alert(div.innerHTML);

	
	  
	  
	  });
   })
   	
   .controller( 'LoginController' , function( $scope) {
     ons.ready(function() {

	  
	 
	 $scope.menu.setSwipeable(false)
	 
	 $scope.$apply(function() {
		  $scope.chargement=true;
          });
	
	 
		var usersauv=window.localStorage.getItem("user");
		if (usersauv!="null")		
		$scope.username=usersauv;
		
			 $scope.menu.setSwipeable(false)
	 
	 
   var user = "";
  var pass = "";
  
	 user = window.localStorage.getItem("user");
   pass = window.localStorage.getItem("pass");
  
  
  
  regid=window.localStorage.getItem("pushid");
  $.ajax({
url: MAJURL,
 timeout: 10000,
type: "POST",
dataType:'json',
data: {regid: regid,name: user,email:user},
success: function(data){
tarifidrecu=data.result.tarifid;
newsidrecu=data.result.newsid;
contactidrecu=data.result.contactid;
 $scope.menu.setMainPage('news.html', { animation: "none" });
		

},
error: function(data){
 $scope.menu.setMainPage('news.html', { animation: "none" });
}

})	

});
	
})

  .controller( 'Photo' , function( $scope) {
     ons.ready(function() { 

 
     $(".fb-album-container").FacebookAlbumBrowser("",$scope);

    });
	})
	
	
  .controller( 'Contact' , function( $scope) {
      
	 ons.ready(function() { 

	var lientel; 
	 var lienadresse;
	 var lienmail;
	 
	  if ( window.localStorage.getItem("contactid") != contactidrecu){

$.ajax({
url: CONTACTURL,
 timeout: 10000,
type: "GET",
dataType: 'json',

success: function(data){
//alert("success");
//$scope.$apply(function() {
		
    window.localStorage.setItem("contact", JSON.stringify(data.result));          
	window.localStorage.setItem("contactid", JSON.stringify(data.id));
                
	document.getElementById('horaire').innerHTML = data.result.horaire; //"Tous les jours de 9h à minuit (sur résa) <br> Bureau : Mardi - Samedi de 14h à 19h";
	document.getElementById('tel').innerHTML = data.result.tel;//"04.79.33.03.03";
	document.getElementById('map').innerHTML =data.result.adresse;//"236 Z.A.C. De la Prairie<br>73420 Voglans";
	document.getElementById('mail').innerHTML =data.result.mail;//"laser13chambery@gmail.com";
	document.getElementById('bus').innerHTML = data.result.bus;//"En Bus?<br> Avec le Réseau STAC :<br>Ligne A - Arrêt Prairie";
 
     contactidrecu=data.id;
	 lientel=data.result.tellien; 
	 lienadresse=data.result.lienadresse;
	 lienmail=data.result.maillien;
	 
            }
			});
			
			
		}
      
			var b=window.localStorage.getItem("contact");
			if (b!=null){
			var contactsauv=JSON.parse(b);
			document.getElementById('horaire').innerHTML = contactsauv.horaire; //"Tous les jours de 9h à minuit (sur résa) <br> Bureau : Mardi - Samedi de 14h à 19h";
	document.getElementById('tel').innerHTML = contactsauv.tel;//"04.79.33.03.03";
	document.getElementById('map').innerHTML =contactsauv.adresse;//"236 Z.A.C. De la Prairie<br>73420 Voglans";
	document.getElementById('mail').innerHTML =contactsauv.mail;//"laser13chambery@gmail.com";
	document.getElementById('bus').innerHTML = contactsauv.bus;//"En Bus?<br> Avec le Réseau STAC :<br>Ligne A - Arrêt Prairie";
 
	 lientel=contactsauv.tellien; 
	 lienadresse=contactsauv.lienadresse;
	 lienmail=contactsauv.maillien;
		
	}
	 

 $scope.mail = function() {

cordova.InAppBrowser.open(lienmail, '_system');

}



 $scope.tel = function() {

cordova.InAppBrowser.open(lientel, '_system');



} 
	 
	 
 $scope.map = function() {

  
  launchnavigator.navigate(lienadresse,
  {
    appSelection : {
	dialogHeaderText :	"Ouvrir avec ...",
	cancelButtonText  : "Annuler",
	
	rememberChoice  : { enabled : false}
	} }
	);


}

    });
	})	
	
	
	
	 .controller( 'ProfilController' , function( $scope) {
     ons.ready(function() { 

	 var b=window.localStorage.getItem("Login");
	
	 var a = JSON.parse(b);
	 $scope.pseudo=a.pseudo;
	 $scope.email=a.email;
	 $scope.nom=a.nom;
	 $scope.prenom=a.prenom; 
	  $scope.dateanniv=new Date(a.dateanniv);
	  $scope.zip=a.codepostal; 
	 
	 var passsauv=window.localStorage.getItem("pass");
		if (passsauv!="null"){		
		$scope.pass1=passsauv;
		$scope.pass2=passsauv;
}
		
$scope.maj = function() {

var pass = window.localStorage.getItem("pass");

 if(!$scope.pass1 || $scope.pass1.length<4 ) 
ons.notification.alert({
              message: "Mot de passe trop court (4car. mini)",         // message
              title: "Laser13"});

	 else
if ($scope.pass1 != $scope.pass2 && $scope.pass1!="" )	ons.notification.alert({
              message: "Mot de passe non identiques",         // message
              title: "Laser13"});

else			  
if ($scope.Ancienpass && $scope.pseudo && $scope.pass1 && $scope.nom /*&& $scope.zip*/ && $scope.prenom && $scope.pass2){ 	 

var anniv=new Date($scope.dateanniv);

 plateos=window.localStorage.getItem("os");

 regid=window.localStorage.getItem("pushid");
$.ajax({
url: MISEAJOURCOMPTE,
 timeout: 10000,
type: "POST",
dataType:'json',
data: {regid: regid, 
pseudo: $scope.pseudo,
password: $scope.Ancienpass,
newpassword: $scope.pass1,
nom: $scope.nom,
dateanniv: anniv.toISOString().split('T')[0],
zipcode: $scope.zip,
prenom: $scope.prenom,
email:$scope.email,
os:plateos},
success: function(data){

if (data.result.status=="1"){
ons.notification.alert({
              messageHTML: "Compte modifié avec succès.<br>Veuillez vous reconnecter",         // message
              title: "Laser13"});

window.localStorage.removeItem("Login");
//window.localStorage.removeItem("user");
window.localStorage.removeItem("pass");

	$scope.appNavigator.popPage({onTransitionEnd : function() {
    
	 $scope.menu.setMainPage('fidelite.html', { animation : 'none' } );
    
	
	}});
	
if(1) {
FCM.unsubscribeFromTopic('laser13log');
//	 var utilisateur=window.localStorage.getItem("user");
	//	 FCM.subscribeToTopic(utilisateur);	
}

}

if (data.result.status=="2"){
ons.notification.alert({
              message: "Mot de passe incorrect",         // message
              title: "Laser13"});


}

}})
}else{

ons.notification.alert({
              message: "Veuillez saisir tous les champs",         // message
              title: "Laser13"});
			  
}


}
 
	 
$scope.deco = function() {
//alert("kikoo");
if(1) {
FCM.unsubscribeFromTopic('laser13log');
		// var utilisateur=window.localStorage.getItem("user");
		// FCM.subscribeToTopic(utilisateur);	
}
window.localStorage.removeItem("Login");
//window.localStorage.removeItem("user");
window.localStorage.removeItem("pass");



	
	$scope.appNavigator.popPage({onTransitionEnd : function() {
    
	 $scope.menu.setMainPage('fidelite.html', { animation : 'none' } );
    
	
	}
	
	})
	
}
	 
	 
    });
	})	
	
	
 .controller( 'Fidelite' , function( $scope) {
     ons.ready(function() { 

	 

	
	 $scope.$apply(function() {

          });
	      
/*	 
	  var b=window.localStorage.getItem("Login");
	
	 var a = JSON.parse(b);
	 $scope.messperso=a.pseudo;

	 	document.getElementById('perso').innerHTML = decodeURI(a.messperso);
	 var qrcode = new QRCode("qrcode")
	 $scope.pseudo=a.pseudo;

       qrcode.makeCode(a.email);

	 
		var usersauv=window.localStorage.getItem("user");
		if (usersauv!="null")		
		$scope.username=usersauv;
		
	
	 
	 */
   var user = "";
  var pass = "";
  
	 user = window.localStorage.getItem("user");
   pass = window.localStorage.getItem("pass");
  
	 
  	if (user!=null & pass!=null){
	
plateos=window.localStorage.getItem("os");
 regid=window.localStorage.getItem("pushid");
  $.ajax({
url: LOGINURL,
 timeout: 10000,
type: "POST",
dataType: 'json',
data: {username: user, password: pass, regid:regid, os:plateos},
success: function(data){

//var data=JSON.parse(datarecu);
//alert(JSON.stringify(data.result));
window.localStorage.setItem("Login", JSON.stringify(data.result));

	if (data.result.status=='1') {
	
		
$scope.$apply(function() {
		$scope.sfidelite=true;
		  $scope.slogin=false;
		    
		   var b=window.localStorage.getItem("Login");
	
	 var a = JSON.parse(b);
	// $scope.messperso=a.messperso;
 $scope.pseudo=a.pseudo;
 
	 //	document.getElementById('perso').innerHTML = decodeURI(a.messperso);
	 var qrcode = new QRCode("qrcode")
	

       qrcode.makeCode(a.email);

	 
		var usersauv=window.localStorage.getItem("user");
		if (usersauv!="null")		
		$scope.username=usersauv;
		
	
			if(1) { 
		 FCM.subscribeToTopic('laser13log');
		// var utilisateur=window.localStorage.getItem("user");
		// FCM.subscribeToTopic(utilisateur);		
		}
		 });
       
		  //	document.getElementById('perso').innerHTML = decodeURI(a.messperso);
		  }
 else 	$scope.$apply(function() {
          $scope.slogin=true;
		  $scope.sfidelite=false;
          });
		 

},
error: function(data){

 var a=window.localStorage.getItem("Login");
	 	var logrecu=JSON.parse(a);
		
	if (logrecu.status=='1') 
	{	
$scope.$apply(function() {
          $scope.sfidelite=true;
		  $scope.slogin=false;
          });
		  }
	 else 	$scope.$apply(function() {
          $scope.slogin=true;
		  $scope.sfidelite=false;
          });	 


}})

	
	 
	
		
	

	} else 	$scope.$apply(function() {
          $scope.slogin=true;
		  $scope.sfidelite=false;
          });
		  
		  
	 
	 
	 

	   
	 
$scope.Fid = function() {
//alert('ok');
cordova.InAppBrowser.open(FIDELITEURL + user, '_blank', "location=no,footer=yes,footercolor=#CC000000,closebuttoncaption=Quitter,closebuttoncolor=#ff5e00" );


}


$scope.profil = function() {

	$scope.appNavigator.pushPage('profil.html', { animation: "none" });
	 
	 }
	 
	 
	 
	 	 
	  
	 $scope.creecompte = function(){
	 
	
	//$scope.appNavigator.pushPage('appli.html');
	$scope.appNavigator.pushPage('Compte.html', { animation: "none" });
	
	 
	 }
	 
	 
	 
	  $scope.recupmail = function(){
	 
  var user = $scope.username;

 // alert("envoie "+user+" "+pass);
  if ($scope.username!="" ){
  
  $.ajax({
url: RECUPURL,
 timeout: 10000,
type: "POST",
dataType: 'json',
data: {mail: user},
success: function(datarecu){

ons.notification.alert({
				title:'Laser13',
				messageHTML: datarecu.result.message
				});

},
error : function (datarecu)
{
ons.notification.alert({
				title:'Erreur',
				messageHTML: 'Erreur de connexion'
				});
				
				}

})

}

else {
ons.notification.alert({
				title:'Erreur',
				messageHTML: 'Veuillez saisir un e-mail;'
				});
				}
				
				
}
	 
	
	 
	 
	 
	$scope.log = function() {

  var user = $scope.username;
  var pass = $scope.password;

  window.localStorage.setItem("user", user);
  window.localStorage.setItem("pass", pass);
  
 // alert("envoie "+user+" "+pass);
  
   regid=window.localStorage.getItem("pushid");
   
  $.ajax({
url: LOGINURL,
 timeout: 10000,
type: "POST",
dataType: 'text',
data: {username: user, password: pass, regid:regid},
success: function(datarecu){

var data=JSON.parse(datarecu);

window.localStorage.setItem("Login", JSON.stringify(data.result));

			//	alert('sav');
if (data.result.status=='1') 	   $scope.menu.setMainPage('fidelite.html', { animation: "none" });

if (data.result.status=='0') ons.notification.alert({
				title:'Erreur',
				messageHTML: 'Erreur de connexion'
				});
				
if (data.result.status=='2') ons.notification.alert({
				title:'Erreur',
				messageHTML: 'Login ou Mot de passe incorrect'
				});


},
error : function (datarecu)
{
ons.notification.alert({
				title:'Erreur',
				messageHTML: 'Erreur de connexion'
				});}

})}


 
    });
	})	
	
	
		 .controller( 'Comptecontroller' , function( $scope) {
     ons.ready(function() { 


	 
	 $scope.cree = function() {
if(!$scope.email) 
ons.notification.alert({
              message: "Adresse e-mail incorrecte",         // message
              title: "Laser13"});

	 else
	 if(!$scope.pass1 || $scope.pass1.length<4 ) 
ons.notification.alert({
              message: "Mot de passe trop court (4car. mini)",         // message
              title: "Laser13"});

	 else
if ($scope.pseudo && $scope.pass1 && $scope.nom /*&& $scope.dateanniv && $scope.zip*/ && $scope.prenom && $scope.email && $scope.pass2){ 	 
if ($scope.pass1 == $scope.pass2)	 
{
plateos=window.localStorage.getItem("os");

 regid=window.localStorage.getItem("pushid");
var anniv=new Date($scope.dateanniv);
$.ajax({
url: CREECOMPTEURL,
 timeout: 10000,
type: "POST",
dataType:'json',
data: {regid: regid, 
pseudo: $scope.pseudo,
os:plateos,
password: $scope.pass1,
nom: $scope.nom,
dateanniv:anniv.toISOString().split('T')[0],
zipcode: $scope.zip,
prenom: $scope.prenom,
email:$scope.email},
success: function(data){
//alert(data);
if (data.result=="1"){
ons.notification.alert({
              message: "Compte créé avec succès",         // message
              title: "Laser13"});

$scope.appNavigator.popPage('fidelite.html');

}

if (data.result=="2"){
ons.notification.alert({
              message: "Adresse email deja utilisé",         // message
              title: "Laser13"});

}

}});

} else {
ons.notification.alert({
              message: "Les mots de passe saisies ne sont pas identiques",         // message
              title: "Laser13"});
}



}
 else{

ons.notification.alert({
              message: "Veuillez saisir tous les champs *",         // message
              title: "Laser13"});

}
	} 
    });
	})	



		 .controller( 'Tarifcontroller' , function($scope) {
     ons.ready(function() { 

   if ( window.localStorage.getItem("tarifid") != tarifidrecu){

$.ajax({
url: TARIFURL,
 timeout: 10000,
type: "GET",
dataType: 'json',

success: function(data){

            //  alert("télé");
                
		window.localStorage.setItem("tarif", JSON.stringify(data.result));
		document.getElementById('desc').innerHTML = data.result.html;
		window.localStorage.setItem("tarifid", JSON.stringify(data.id));
		tarifidrecu=data.id;
            },
			
			
error: function(data) {
                

            }});
			}
			//else  {
			//alert("sauv");
			var b=window.localStorage.getItem("tarif");
			if (b!=null){
			var tarifsauv=JSON.parse(b);
		document.getElementById('desc').innerHTML = tarifsauv.html; 
	 
	 }
    });
	})	

	
})();
