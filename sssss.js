var contractAddress="0xc5e84e15ea84f607dac61846f4c6d909c9981023"; //POA Core

//-- WEB3 DETECTION --//

window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
			web3.version.getNetwork(function(error, result) {
				if (!error) {
					if (result != "99") {
						console.log("Error: you must be on POA Network to use this website.");
						//showModal(network_modal);
					}
				}
			});
            // Acccounts now exposed
            //web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        //web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        //////console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

/* MODAL */

//-- VARIABLES --//

var a_message = "";
var a_req = 0;

var doc_message = document.getElementById('message');
var doc_name = document.getElementById('name');
var doc_nest1 = document.getElementById('nest1');
var doc_egg1 = document.getElementById('egg1');
var doc_ascension1 = document.getElementById('ascension1');

var doc_fieldMessage = document.getElementById('field_message');
var	doc_fieldFirstName = document.getElementById('field_first_name');
var	doc_fieldName = document.getElementById('field_name');
var	doc_fieldOther = document.getElementById('field_other');
var	doc_fieldOtherName = document.getElementById('field_other_name');
var	doc_fieldFighter = document.getElementById('field_fighter');
var	doc_fieldOdd = document.getElementById('field_odd');

//-- UPDATE LOOP --//

function initUpdate(){
	mainUpdate();
	fastUpdate();
}	

function mainUpdate(){
	updateMessage();
	updateReq();
	setTimeout(mainUpdate, 4000);
}

function fastUpdate(){
	setTimeout(fastUpdate, 123);
}

//-- WEB3 CALLS --//

function updateMessage(){
	message(function(result) {
		a_message = result;
		doc_message.innerHTML = a_message;
	});
}

function updateReq(){
	NAME_OTHER_REQ(function(result) {
		a_req = result;
	});
}

//-- WEB3 ACTIONS --//

function webJoinGame() {
	JoinGame(doc_fieldFirstName, function(){
	});
}

function webHatch(_nest) {
	HatchEgg(_nest, function(){
	});
}

function webNameMe() {
	NameMe(1, doc_fieldName, function(){
	});
}

function webRenameOther() {
	RenameOther(1, doc_fieldOtherName, doc_fieldOther, function(){
	});
}

function webChangeMessage() {
	ChangeMessage(doc_message, function(){
	});
}

function webVentureLair() {
	VentureLair(1, doc_fieldFighter, doc_fieldOdd, function(){
	});
}

function webResolveFight() {
	ResolveFight(function(){
	});
}

/* CONTRACT ABI */

abiDefinition=[{"constant": false,"inputs": [{"name": "_message","type": "string"}],"name": "ChangeMessage","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_nest","type": "uint256"}],"name": "HatchEgg","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "string"}],"name": "JoinedGame","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "string"},{"indexed": false,"name": "eggUsed","type": "uint256"},{"indexed": false,"name": "eggBonus","type": "uint256"},{"indexed": false,"name": "newSnail","type": "uint256"},{"indexed": false,"name": "nestCount","type": "uint256"},{"indexed": false,"name": "nest","type": "uint256"}],"name": "Hatched","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "string"},{"indexed": false,"name": "message","type": "string"}],"name": "ChangedMessage","type": "event"},{"constant": false,"inputs": [{"name": "_name","type": "string"}],"name": "JoinGame","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "string"},{"indexed": false,"name": "name","type": "string"}],"name": "NamedPlayer","type": "event"},{"constant": false,"inputs": [{"name": "_nest","type": "uint256"},{"name": "_name","type": "string"}],"name": "NameMe","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "string"},{"indexed": false,"name": "previousName","type": "string"},{"indexed": false,"name": "name","type": "string"}],"name": "RenamedOther","type": "event"},{"constant": false,"inputs": [{"name": "_nest","type": "uint256"},{"name": "_name","type": "string"},{"name": "_adr","type": "address"}],"name": "RenameOther","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "ResolveFight","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "string"},{"indexed": false,"name": "nest","type": "uint256"},{"indexed": false,"name": "fighterCount","type": "uint256"},{"indexed": false,"name": "odd","type": "uint256"}],"name": "VenturedLair","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "string"},{"indexed": false,"name": "nest","type": "uint256"},{"indexed": false,"name": "fighterCount","type": "uint256"},{"indexed": false,"name": "odd","type": "uint256"},{"indexed": false,"name": "result","type": "uint256"},{"indexed": false,"name": "reward","type": "uint256"}],"name": "WonFight","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "string"},{"indexed": false,"name": "nest","type": "uint256"},{"indexed": false,"name": "fighterCount","type": "uint256"},{"indexed": false,"name": "odd","type": "uint256"},{"indexed": false,"name": "result","type": "uint256"}],"name": "LostFight","type": "event"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"constant": false,"inputs": [{"name": "_nest","type": "uint256"},{"name": "_fighterCount","type": "uint256"},{"name": "_odd","type": "uint256"}],"name": "VentureLair","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "canChangeMessage","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_nest","type": "uint256"},{"name": "_adr","type": "address"}],"name": "ComputeEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeGlobalBonus","outputs": [{"name": "_egg","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "FROGKING_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_adr","type": "address"}],"name": "GetName","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_nest","type": "uint256"},{"name": "_adr","type": "address"}],"name": "GetNest","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hasStartingSnail","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "lastGlobalHatch","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "message","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "name","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "NAME_OTHER_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "NAME_YOURSELF_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"},{"name": "","type": "uint256"}],"name": "nest","outputs": [{"name": "number","type": "uint256"},{"name": "lastHatch","type": "uint256"},{"name": "ascension","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "resolveBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "resolveCount","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "resolveNest","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "resolveOdd","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "STARTING_SNAIL","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "TIME_TO_HATCH_1SNAIL","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}];

var contractAbi = web3.eth.contract(abiDefinition);
var myContract = contractAbi.at(contractAddress);

function ChangeMessage(_message,callback){
    var outputData = myContract.ChangeMessage.getData(_message);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ChangeMessage ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function HatchEgg(_nest,callback){
    
    
    var outputData = myContract.HatchEgg.getData(_nest);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('HatchEgg ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function JoinGame(_name,callback){
    
    
    var outputData = myContract.JoinGame.getData(_name);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('JoinGame ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function NameMe(_nest,_name,callback){
    
    
    var outputData = myContract.NameMe.getData(_nest,_name);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('NameMe ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function RenameOther(_nest,_name,_adr,callback){
    
    
    var outputData = myContract.RenameOther.getData(_nest,_name,_adr);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('RenameOther ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ResolveFight(callback){
    
    
    var outputData = myContract.ResolveFight.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ResolveFight ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function VentureLair(_nest,_fighterCount,_odd,callback){
    
    
    var outputData = myContract.VentureLair.getData(_nest,_fighterCount,_odd);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('VentureLair ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function canChangeMessage(callback){
    
    
    var outputData = myContract.canChangeMessage.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('canChangeMessage ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeEgg(_nest,_adr,callback){
    
    
    var outputData = myContract.ComputeEgg.getData(_nest,_adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ComputeEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeGlobalBonus(callback){
    
    
    var outputData = myContract.ComputeGlobalBonus.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ComputeGlobalBonus ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function FROGKING_REQ(callback){
    
    
    var outputData = myContract.FROGKING_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('FROGKING_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetName(_adr,callback){
    
    
    var outputData = myContract.GetName.getData(_adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('GetName ',web3.toAscii(result));
            callback(web3.toAscii(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetNest(_nest,_adr,callback){
    
    
    var outputData = myContract.GetNest.getData(_nest,_adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('GetNest ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function hasStartingSnail(callback){
    
    
    var outputData = myContract.hasStartingSnail.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('hasStartingSnail ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function lastGlobalHatch(callback){
    
    
    var outputData = myContract.lastGlobalHatch.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('lastGlobalHatch ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}

function toAscii(hex) {
  var str = "";
  var i = 0, l = hex.length;
  if (hex.substring(0, 2) === '0x') {
    i = 2;
  }
  for (; i < l; i+=2) {
    var code = parseInt(hex.substr(i, 2), 16);
    if(code != 0) {
      str += String.fromCharCode(code);
    }
  }

  return str.substring(2);
}

function message(callback){
    
    
    var outputData = myContract.message.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('message ',toAscii(result));
            callback(toAscii(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function name(callback){
    
    
    var outputData = myContract.name.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('name ',web3.toAscii(result));
            callback(web3.toAscii(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function NAME_OTHER_REQ(callback){
    
    
    var outputData = myContract.NAME_OTHER_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('NAME_OTHER_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function NAME_YOURSELF_REQ(callback){
    
    
    var outputData = myContract.NAME_YOURSELF_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('NAME_YOURSELF_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function nest(callback){
    
    
    var outputData = myContract.nest.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('nest ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function resolveBlock(callback){
    
    
    var outputData = myContract.resolveBlock.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('resolveBlock ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function resolveCount(callback){
    
    
    var outputData = myContract.resolveCount.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('resolveCount ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function resolveNest(callback){
    
    
    var outputData = myContract.resolveNest.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('resolveNest ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function resolveOdd(callback){
    
    
    var outputData = myContract.resolveOdd.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('resolveOdd ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function STARTING_SNAIL(callback){
    
    
    var outputData = myContract.STARTING_SNAIL.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('STARTING_SNAIL ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function TIME_TO_HATCH_1SNAIL(callback){
    
    
    var outputData = myContract.TIME_TO_HATCH_1SNAIL.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('TIME_TO_HATCH_1SNAIL ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}



