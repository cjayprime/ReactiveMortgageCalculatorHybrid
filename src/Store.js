import {decorate, observable, autorun} from 'mobx';

class Store {
	
	MAJOR_COLOR = '#F2D531'
	
	propertyValue = {
		text: 'Home Value',
		type: 'variable',
		value: {
			fixed: {
				default: '500000'
			},
			variable: {
				default: '3000',
				minimum: '1000',
				maximum: '1000000'
			}
		}
	};
	
	downPayment = {
		text: 'Down Payment',
		type: 'variable',
		valueType: 'amount',
		value: {
			fixed: {
				default: '10',
			},
			variable: {
				default: '20',
				minimum: '3',
				maximum: '80'
			}
		}
	};
	
	interestRate = {
		logo: '',
		name: '',
		text: 'Interest Rate (%)',
		type: 'variable',
		value: {
			fixed: {
				default: '5.5'
			},
			variable: {
				default: '4.5',
				minimum: '1',
				maximum: '20'
			}
		}
	};
	
	tenure = {
		text: 'Amortization Period',
		startAfter: '1',
		type: 'variable',
		value: {
			fixed: {
				default: '15'
			},
			variable: {
				default: '20',
				minimum: '1',
				maximum: '50'
			}
		}
	};
	
	taxAndCharges = {
		property: {
			text: 'Annual Property Tax',
			default: '0.8',
			minimum: '0',
			maximum: '3'
		},
		annualHazard: {
			text: 'Property Insurance',
			default: '0',
			minimum: '0',
			maximum: '5000'
		},
		mortgageInsurance: {
			text: 'MI',
			default: '0',
			minimum: '0',
			maximum: '2'
		}
	};
	
	others = {
		currency: {
			symbol: '$'
		}
	};
	
}

decorate(Store, {
	propertyValue: observable,
	downPayment: observable,
	interestRate: observable,
	tenure: observable,
	taxAndCharges: observable,
	others: observable
});

const store = new Store();
const applyStoreData = ()=>{
	// A property of the Store class must execute
	// in other for mobx to register it as being
	// observed in autorun, so ensuring store isn't blocked by the if
	// statement ensures store executes the first time
	// window.APPLY is defined in the script loaded
	// into shopify stores and the preview column
	var data = JSON.parse(JSON.stringify(store));
	if(window.APPLY){
		if(id)clearInterval(id);
		window.APPLY(data, '#reactive-sample');
	}
}

//First run
var id = setInterval(applyStoreData,400);

autorun(applyStoreData);

export default store;