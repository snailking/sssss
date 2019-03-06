var contractAddress="0x5ec7938a15bd80c64b9911966788d575041dbf2c"; //POA Core v2

/* WEB3 DETECTION */

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

/* VARIABLES */

var a_message = "";
var a_playerName = "";
var a_req = 0;
var a_nestSize = [0, 0, 0, 0, 0, 0, 0, 0];
var a_nestEgg = [0, 0, 0, 0, 0, 0, 0, 0];
var a_nestAscension = [0, 0, 0, 0, 0, 0, 0, 0];

var f_message = "";
var f_initialName = "";
var f_name = "";
var f_otherAdr;
var f_otherName = "";
var f_fighter = 0;
var f_odd = 50;

var m_account = "";

var doc_message = document.getElementById('message');
var doc_name = document.getElementById('name');

var doc_fieldMessage = document.getElementById('field_message');
var	doc_fieldInitialName = document.getElementById('field_first_name');
var	doc_fieldName = document.getElementById('field_name');
var	doc_fieldOtherAdr = document.getElementById('field_other');
var	doc_fieldOtherName = document.getElementById('field_other_name');
var	doc_fieldFighter = document.getElementById('field_fighter');
var	doc_fieldOdd = document.getElementById('field_odd');

var doc_nestSize = [
document.getElementById('nest0'),
document.getElementById('nest1'),
document.getElementById('nest2'),
document.getElementById('nest3'),
document.getElementById('nest4'),
document.getElementById('nest5'),
document.getElementById('nest6'),
document.getElementById('nest7')
];

var doc_nestEgg = [
document.getElementById('egg0'),
document.getElementById('egg1'),
document.getElementById('egg2'),
document.getElementById('egg3'),
document.getElementById('egg4'),
document.getElementById('egg5'),
document.getElementById('egg6'),
document.getElementById('egg7')
];

var doc_nestAscension = [
document.getElementById('ascension0'),
document.getElementById('ascension1'),
document.getElementById('ascension2'),
document.getElementById('ascension3'),
document.getElementById('ascension4'),
document.getElementById('ascension5'),
document.getElementById('ascension6'),
document.getElementById('ascension7')
];

/* UPDATE LOOP */

function initUpdate(){
	mainUpdate();
	fastUpdate();
}	

function mainUpdate(){
	updateText();
	updateMessage();
	updateEthAccount();
	updatePlayerName();
	runLoop(checkNestSize);
	runLoop(checkNestEgg);
	runLoop(checkNestAscension);
	setTimeout(mainUpdate, 4000);
}

function fastUpdate(){
	refreshFieldMessage();
	refreshFieldFirstName();
	refreshFieldName();
	refreshFieldOtherAdr();
	refreshFieldOtherName();
	refreshFieldFighter();
	refreshFieldOdd();
	setTimeout(fastUpdate, 123);
}

/* UTILITIES */

//Loop function to go through nests
function runLoop(_loop){
	for(i = 0; i < 8; i++){
		_loop(i);
	}
}

//toAscii function (web3.toAscii doesn't work properly)
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

/* MODAL */

/* LOCAL FIELDS */

function refreshFieldMessage(){
	f_message = doc_fieldMessage.value; 
}

function refreshFieldFirstName(){
	f_initialName = doc_fieldInitialName.value; 
}

function refreshFieldName(){
	f_name = doc_fieldName.value; 
}

function refreshFieldOtherAdr(){
	f_otherAdr = doc_fieldOtherAdr.value; 
}

function refreshFieldOtherName(){
	f_otherName = doc_fieldOtherName.value; 
}

function refreshFieldFighter(){
	f_fighter = doc_fieldFighter.value; 
}

function refreshFieldOdd(){
	if(doc_fieldOdd.value > 95){
		doc_fieldOdd.value = 95;
	}
	f_odd = doc_fieldOdd.value;
}

/* TEXT UPDATE */

function updateText(){
	doc_name.innerHTML = a_playerName;
	doc_message.innerHTML = a_message;
	runLoop(changeNestText);
	runLoop(changeEggText);
	runLoop(changeAscensionText);
}	

function changeNestText(_nest){
	doc_nestSize[_nest].innerHTML = a_nestSize[_nest];
}

function changeEggText(_nest){
	doc_nestEgg[_nest].innerHTML = a_nestEgg[_nest];
}
function changeAscensionText(_nest){
	doc_nestAscension[_nest].innerHTML = a_nestAscension[_nest];
}

/* WEB3 CALLS */

// Current ETH address in use
function updateEthAccount(){
	m_account = web3.eth.accounts[0];
}

function updateMessage(){
	message(function(result) {
		a_message = result;
	});
}

function updatePlayerName(){
	GetName(m_account, function(result) {
		a_playerName = result;
	});
}

function checkNestSize(_nest){
	GetNest(_nest, m_account, function(result) {
		a_nestSize[_nest] = result;
	});
}

function checkNestEgg(_nest){
	ComputeEgg(_nest, m_account, function(result) {
		a_nestEgg[_nest] = result;
	});
}

function checkNestCount(_nest){
	GetAscension(_nest, m_account, function(result) {
		a_nestAscension[_nest] = result;
	});
}

function checkNestAscension(_nest){
}

/* WEB3 ACTIONS */

function webJoinGame() {
	JoinGame(f_initialName, function(){
	});
}

function webHatch(_nest) {
	HatchEgg(_nest, function(){
	});
}

function webNameMe() {
	NameMe(1, f_name, function(){
	});
}

function webRenameOther() {
	RenameOther(1, f_otherName, f_otherAdr, function(){
	});
}

function webChangeMessage() {
	ChangeMessage(f_message, function(){
	});
}

function webVentureLair() {
	if(f_odd < 5){
		f_odd = 5;
	}
	VentureLair(1, f_fighter, f_odd, function(){
	});
}

function webResolveFight() {
	ResolveFight(function(){
	});
}

/* CONTRACT ABI */

abiDefinition=[{"constant": false,"inputs": [{"name": "_message","type": "string"}],"name": "ChangeMessage","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_nest","type": "uint256"}],"name": "HatchEgg","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "string"}],"name": "JoinedGame","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "string"},{"indexed": false,"name": "eggUsed","type": "uint256"},{"indexed": false,"name": "eggBonus","type": "uint256"},{"indexed": false,"name": "newSnail","type": "uint256"},{"indexed": false,"name": "nestCount","type": "uint256"},{"indexed": false,"name": "nest","type": "uint256"}],"name": "Hatched","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "string"},{"indexed": false,"name": "message","type": "string"}],"name": "ChangedMessage","type": "event"},{"constant": false,"inputs": [{"name": "_name","type": "string"}],"name": "JoinGame","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "string"},{"indexed": false,"name": "name","type": "string"}],"name": "NamedPlayer","type": "event"},{"constant": false,"inputs": [{"name": "_nest","type": "uint256"},{"name": "_name","type": "string"}],"name": "NameMe","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "string"},{"indexed": false,"name": "previousName","type": "string"},{"indexed": false,"name": "name","type": "string"}],"name": "RenamedOther","type": "event"},{"constant": false,"inputs": [{"name": "_nest","type": "uint256"},{"name": "_name","type": "string"},{"name": "_adr","type": "address"}],"name": "RenameOther","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "ResolveFight","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "string"},{"indexed": false,"name": "nest","type": "uint256"},{"indexed": false,"name": "fighterCount","type": "uint256"},{"indexed": false,"name": "odd","type": "uint256"}],"name": "VenturedLair","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "string"},{"indexed": false,"name": "nest","type": "uint256"},{"indexed": false,"name": "fighterCount","type": "uint256"},{"indexed": false,"name": "odd","type": "uint256"},{"indexed": false,"name": "result","type": "uint256"},{"indexed": false,"name": "reward","type": "uint256"}],"name": "WonFight","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "string"},{"indexed": false,"name": "nest","type": "uint256"},{"indexed": false,"name": "fighterCount","type": "uint256"},{"indexed": false,"name": "odd","type": "uint256"},{"indexed": false,"name": "result","type": "uint256"}],"name": "LostFight","type": "event"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"constant": false,"inputs": [{"name": "_nest","type": "uint256"},{"name": "_fighterCount","type": "uint256"},{"name": "_odd","type": "uint256"}],"name": "VentureLair","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "canChangeMessage","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_nest","type": "uint256"},{"name": "_adr","type": "address"}],"name": "ComputeEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeGlobalBonus","outputs": [{"name": "_egg","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "FROGKING_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_nest","type": "uint256"},{"name": "_adr","type": "address"}],"name": "GetAscension","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_adr","type": "address"}],"name": "GetName","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_nest","type": "uint256"},{"name": "_adr","type": "address"}],"name": "GetNest","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hasStartingSnail","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "lastGlobalHatch","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "message","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "name","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "NAME_OTHER_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "NAME_YOURSELF_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"},{"name": "","type": "uint256"}],"name": "nest","outputs": [{"name": "size","type": "uint256"},{"name": "lastHatch","type": "uint256"},{"name": "ascension","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "resolveBlock","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "resolveCount","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "resolveNest","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "resolveOdd","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "STARTING_SNAIL","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "TIME_TO_HATCH_1SNAIL","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}]

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


function GetAscension(_nest,_adr,callback){
    
    
    var outputData = myContract.GetAscension.getData(_nest,_adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('GetAscension ',web3.toDecimal(result));
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
            console.log('GetName ',toAscii(result));
            callback(toAscii(result))
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
            console.log('name ',toAscii(result));
            callback(toAscii(result))
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





