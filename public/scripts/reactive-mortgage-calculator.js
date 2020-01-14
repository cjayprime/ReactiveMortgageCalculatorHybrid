/*
//Material CSS v3.0.0
https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css
//Material JS v3.0.0
https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js
*/
$(document).ready(function(e){	

	var online = navigator.onLine;
	var styles = [online ? 'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css' : 'scripts/material-components-web.min.css'];
	for(var i = 0; i < styles.length; i++){
		var tag = document.createElement('link');
		tag.href = styles[i];
		tag.rel = "stylesheet";
		document.head.appendChild(tag);
	}
	
	var scripts = [material = online ? 'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js' : 'scripts/material-components-web.min.js', loader = 'https://www.gstatic.com/charts/loader.js'];
	for(var i = 0; i < scripts.length; i++){
		//Don't run loader twice
		if(loader != scripts[i] || (loader == scripts[i] && typeof google == 'undefined')){
			var tag = document.createElement('script');
			tag.src = scripts[i];
			tag.async = false;
			tag.onload = function(e){
				if(e.target.src == material)REACTIVE_MORTGAGE_CALCULATOR.slider();
				if(e.target.src == loader)REACTIVE_MORTGAGE_CALCULATOR.google.chart();
			}
			document.head.appendChild(tag);
		}
	}

	/*
	React Mortgage Calculator
	*/
	REACTIVE_MORTGAGE_CALCULATOR = {
		data: {propertyValue:{text:'HomeValue',type:'variable',value:{fixed:{default:'500000'},variable:{default:'3000',minimum:'1000',maximum:'1000000'}}},downPayment:{text:'DownPayment',type:'variable',valueType:'amount',value:{fixed:{default:'10',},variable:{default:'20',minimum:'3',maximum:'80'}}},lenders:[{logo:'',name:'Lender1',text:'InterestRate(%)',type:'variable',value:{fixed:{default:'5.5'},variable:{default:'4.5',minimum:'1',maximum:'20'}}},{logo:'',name:'Lender2',text:'InterestRate(%)',type:'variable',value:{fixed:{default:'5.5'},variable:{default:'4.5',minimum:'1',maximum:'20'}}},{logo:'',name:'Lender3',text:'InterestRate(%)',type:'variable',value:{fixed:{default:'5.5'},variable:{default:'4.5',minimum:'1',maximum:'20'}}}],interestRate:{logo:'',name:'',text:'InterestRate(%)',type:'variable',value:{fixed:{default:'5.5'},variable:{default:'4.5',minimum:'1',maximum:'20'}}},tenure:{text:'AmortizationPeriod',startAfter:'1',type:'variable',value:{fixed:{default:'15'},variable:{default:'20',minimum:'1',maximum:'50'}}},taxAndCharges:{property:{text:'AnnualPropertyTax',default:'0.8',minimum:'0',maximum:'3'},annualHazard:{text:'AnnualHazardInsurance',default:'0',minimum:'0',maximum:'5000'},monthlyHOA:{text:'MonthlyHOA',default:'0',minimum:'0',maximum:'200'},mortgageInsurance:{text:'MI',default:'0',minimum:'0',maximum:'2'}},others:{currency:{symbol:'$'}}},
		base: $,
		google: {
			chart: function(){
				var savedData = REACTIVE_MORTGAGE_CALCULATOR.data;
				
				google.charts.load('current', {'packages':['corechart']});
				google.charts.setOnLoadCallback(drawPieChart);
				function drawPieChart() {
					var data = google.visualization.arrayToDataTable([
						['Data type', 'Data value'],
						
						['Principal & Interest', parseFloat(savedData.propertyValue.value[savedData.propertyValue.type].default) - parseFloat(savedData.downPayment.value[savedData.downPayment.type].default)],
						[savedData.taxAndCharges.property.text, parseFloat(savedData.propertyValue.value[savedData.propertyValue.type].default) * ( parseFloat(savedData.taxAndCharges.property.default) / 100)],
						[savedData.taxAndCharges.annualHazard.text, parseFloat(savedData.taxAndCharges.annualHazard.default)],
						[savedData.taxAndCharges.mortgageInsurance.text, parseFloat(savedData.taxAndCharges.mortgageInsurance.default)]
					]);
					
					var options = {
						title: 'Total Breakdown',
						titleTextStyle: {
							fontSize: 18,
							fontWeight: 200,
							textAlign: 'center'
						},
						pieHole: 0.5,
						//height: REACTIVE_MORTGAGE_CALCULATOR.base.height(),
						width: REACTIVE_MORTGAGE_CALCULATOR.base.width() * 0.7,
						legend:{
							position: 'bottom',
							margin: 0,
							padding: 0
						}
					};
					
					var chart = new google.visualization.PieChart($('#reactive-mortgage-calculator-piechart')[0]);
					chart.draw(data, options);
				}
				
				google.charts.load('current', {packages: ['corechart', 'line']});
				google.charts.setOnLoadCallback(drawLineChart);
				function drawLineChart() {
					/*
					M = P * (r * ((1+r) * pow(n)) / ((1+r) * pow(n)) −1;
					
					n is your number of payments (the number of months you will be paying the loan)[6]
					M is your monthly payment.
					P is your principal.
					r is your monthly interest rate, calculated by dividing your annual interest rate by 12.
					
					The variables are as follows (for yearly):
					M = monthly mortgage payment.
					P = the principal amount.
					i = your monthly interest rate. Your lender likely lists interest rates as an annual figure, so you'll need to divide by 12, for each month of the year. ...
					n = the number of payments over the life of the loan.
					
					Monthly Interest = (P - n) / M;
					Total Interest = (M * n) - P;
					Principal = amount borrowed = amount repaid;
					Tax = Property Tax% of Principal
					Insurance = MI + HI
					*/
					//In months
					var rate = (parseFloat(savedData.interestRate.value[savedData.interestRate.type].default) / 100) / 12;
					var tenure = parseFloat(savedData.tenure.value[savedData.tenure.type].default) * 12;
					var startAfter = parseFloat(savedData.tenure.startAfter);
					var downPayment = savedData.downPayment.valueType == 'percent' ? (parseFloat(savedData.downPayment.value[savedData.downPayment.type].default) / 100) * parseFloat(savedData.propertyValue.value[savedData.propertyValue.type].default) : parseFloat(savedData.downPayment.value[savedData.downPayment.type].default);
					var amountBorrowed = (parseFloat(savedData.propertyValue.value[savedData.propertyValue.type].default) - downPayment);
					
					var inTenureTerms = Math.pow(1 + rate, tenure);
					var monthlyPayment = amountBorrowed * ((rate * inTenureTerms) / (inTenureTerms - 1));
					var propertyTax = (parseFloat(savedData.taxAndCharges.property.default) / 100) * amountBorrowed;
					var annualHazard = parseFloat(savedData.taxAndCharges.annualHazard.default);
					var mortgageInsurance = (parseFloat(savedData.taxAndCharges.mortgageInsurance.default) / 100) * amountBorrowed;
					var taxAndInsurance = propertyTax + annualHazard + mortgageInsurance;
					
					var interest, principal, balance, oldInterest, oldPrincipal;
					balance = amountBorrowed;
					oldInterest = oldPrincipal = 0;
					
					var data = new google.visualization.DataTable();
					data.addColumn('string', 'Category');
        			data.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});
					data.addColumn('number', 'Balance');
					data.addColumn('number', 'Principal');
					data.addColumn('number', 'Interest');
					//Tooltip
					var chartData = [];
					var createCustomHTMLContent = function(interest, balance, principal, month) {
						var interest = Math.round(interest * 100) / 100;
						var balance = Math.round(balance * 100) / 100;
						var principal = Math.round(principal * 100) / 100;
						var circle = c = function(color){return '<div style="display:inline-block; width:10px; height:10px; border-radius:10px; margin-right:5px; align-self:center; background:'+color+';"></div>'};
						return '<div style="padding:5px 5px 5px 5px;">' +
							'<div><b>Month '+month+'</b><br></div>'+
							'<table class="medals_layout">' + 
								'<tr>' +
									'<td>'+c('green')+'<b>Balance:</b> </td>' +
									'<td><b>$' + balance + '</b></td>' +
								'</tr>' +
								'<tr>' +
									'<td>'+c('blue')+'<b>Principal:</b> </td>' +
									'<td><b>$' + principal + '</b></td>' +
								'</tr>' + 
								'<tr>' +
									'<td>'+c('red')+'<b>Interest:</b> </td>' +
									'<td><b>$' + interest + '</b></td>' +
								'</tr>' + 
							'</table>' + 
						  '</div>';
					}
					for(var i = 0; i < (tenure + startAfter); i++){
						chartData.push([]);
						var j = chartData.length - 1;
						chartData[j] = [];
						chartData[j][0] = '';
						if(i >= startAfter){
							interest = rate * balance;
							principal = monthlyPayment - interest;
							balance = balance - principal;
							
							//Tooltip
							chartData[j][1] = createCustomHTMLContent(interest,balance,principal,i+1);
							chartData[j][2] = balance + taxAndInsurance;
							chartData[j][3] = oldPrincipal + principal;
							chartData[j][4] = oldInterest + interest;
							oldPrincipal += principal;
							oldInterest += interest;
						}else{
							//Tooltip
							chartData[j][1] = createCustomHTMLContent(0,0,0,i+1);
							chartData[j][2] = 0;
							chartData[j][3] = 0;
							chartData[j][4] = 0;
						}
					}
					data.addRows(chartData);
						
					var options = {
						title: ' Amortization Breakdown',
						curveType: 'function',
						legend: {
							position: 'bottom'
						},
						tooltip: {
							isHtml: true
						},
						hAxis: {
						  title: 'Months'
						},
						vAxis: {
						  title: 'Monthly Payments' + ' (' + savedData.others.currency.symbol + ')'
						},
						colors: ['green', 'blue', 'red'],
						focusTarget: 'category',
						trendlines: {
						  0: {type: 'linear', color: 'green', opacity: 1},
						  1: {type: 'linear', color: 'blue', opacity: .3},
						  2: {type: 'linear', color: 'red', opacity: .3}
						}
					};
					
					var chart = new google.visualization.LineChart($('#reactive-mortgage-calculator-linechart')[0]);
					chart.draw(data, options);
				}
			}
		},
		init: function(){
			var savedData = REACTIVE_MORTGAGE_CALCULATOR.data;
			
			if($('#reactive-mortgage-calculator').length)
			$('#reactive-mortgage-calculator').remove();
			
			var attach = REACTIVE_MORTGAGE_CALCULATOR.base.is('body') || REACTIVE_MORTGAGE_CALCULATOR.base.is('#reactive-sample')  ? 'append' : 'after';
			REACTIVE_MORTGAGE_CALCULATOR.base[attach](
				'<div id="reactive-mortgage-calculator" style="overflow:hidden;display:flex;position:relative;flex-direction:row;flex-wrap: wrap;justify-content:center;align-self:center;z-index: 100000;width:100%;">'+
					'<div style="padding: 10px; width: 45%; overflow: hidden;">'+
						REACTIVE_MORTGAGE_CALCULATOR.sliderHTML(savedData.propertyValue.text, savedData.propertyValue.value[savedData.propertyValue.type].maximum, savedData.propertyValue.value[savedData.propertyValue.type].minimum, savedData.propertyValue.type, savedData.propertyValue.value[savedData.propertyValue.type].default, savedData.others.currency.symbol, '')
						+
						REACTIVE_MORTGAGE_CALCULATOR.sliderHTML(savedData.downPayment.text, savedData.downPayment.value[savedData.downPayment.type].maximum, savedData.downPayment.value[savedData.downPayment.type].minimum, savedData.downPayment.type, savedData.downPayment.value[savedData.downPayment.type].default, savedData.downPayment.valueType == 'percent' ? '' : savedData.others.currency.symbol, savedData.downPayment.valueType == 'percent' ? '%' : '')
						+
						REACTIVE_MORTGAGE_CALCULATOR.sliderHTML(savedData.interestRate.text, savedData.interestRate.value[savedData.interestRate.type].maximum, savedData.interestRate.value[savedData.interestRate.type].minimum,  savedData.interestRate.type, savedData.interestRate.value[savedData.interestRate.type].default, '', '%')
						+
						REACTIVE_MORTGAGE_CALCULATOR.sliderHTML(savedData.tenure.text, savedData.tenure.value[savedData.tenure.type].maximum, savedData.tenure.value[savedData.tenure.type].minimum, savedData.tenure.type, savedData.tenure.value[savedData.tenure.type].default, '', ' Years')
						+
						REACTIVE_MORTGAGE_CALCULATOR.sliderHTML('Start After', 12, 0, '', savedData.tenure.startAfter, '', ' Months')
						+
						REACTIVE_MORTGAGE_CALCULATOR.sliderHTML(savedData.taxAndCharges.property.text, savedData.taxAndCharges.property.maximum, savedData.taxAndCharges.property.minimum, savedData.taxAndCharges.property.type, savedData.taxAndCharges.property.default, '', '%')
						+
						REACTIVE_MORTGAGE_CALCULATOR.sliderHTML(savedData.taxAndCharges.annualHazard.text, savedData.taxAndCharges.annualHazard.maximum, savedData.taxAndCharges.annualHazard.minimum,'', savedData.taxAndCharges.annualHazard.default, savedData.others.currency.symbol, '')
						+
						REACTIVE_MORTGAGE_CALCULATOR.sliderHTML(savedData.taxAndCharges.mortgageInsurance.text, savedData.taxAndCharges.mortgageInsurance.maximum, savedData.taxAndCharges.mortgageInsurance.minimum, savedData.taxAndCharges.mortgageInsurance.type, savedData.taxAndCharges.mortgageInsurance.default,  '', '%')
						+
					'</div>'+
					'<div id="reactive-mortgage-calculator-piechart" style="overflow: hidden; display: flex; justify-content: flex-start; flex-direction: column; align-items: center; width: 45%; height: auto">'+
						
					'</div>'+
					'<div id="reactive-mortgage-calculator-linechart" style="height:500px; width: 100%;">'+
					'</div>'+
				'</div>'
			);
			
			if(typeof window.mdc != 'undefined')
			REACTIVE_MORTGAGE_CALCULATOR.slider();
						
			if(typeof google != 'undefined')
			REACTIVE_MORTGAGE_CALCULATOR.google.chart();
		},
		slider: function(){
			$('.mdc-slider').each(function(){
				const slider = new mdc.slider.MDCSlider(this);
				slider.listen('MDCSlider:change', function(){
					REACTIVE_MORTGAGE_CALCULATOR.google.chart();
				});
				slider.listen('MDCSlider:input', function(){
					var span = $(this).prev('div').children('span').children('span').eq(1);
					var current = span.text(slider.value).data('current');
					var savedData = REACTIVE_MORTGAGE_CALCULATOR.data;
					for(var data in savedData){
						if(typeof savedData[data].text != 'undefined'){
							if(current === 'Start After'){
								savedData.tenure.startAfter = slider.value;
							}else if(savedData[data].text === current){
								savedData[data].value[savedData[data].type].default = slider.value;
								break;
							}
						}else if(data == 'taxAndCharges'){
							for(var tax in savedData[data])
							if(savedData[data][tax].text === current){
								savedData[data][tax].default = slider.value;
								break;
							}
						}
					}
					REACTIVE_MORTGAGE_CALCULATOR.data = savedData;
				});
			});
			window.mdc.autoInit();
		},
		sliderHTML: function(text,max,min,type,current,prefix,suffix){
			var slider = type == 'fixed' ? '<br/><hr style="border: 0.6px solid #BDE0E0;"/><br/>' : '<div class="mdc-slider mdc-slider--discrete" tabindex="0" role="slider" aria-valuemin="'+min+'" aria-valuemax="'+max+'" aria-valuenow="'+current+'" aria-label="Select Value" data-mdc-auto-init="MDCSlider">\
						<div class="mdc-slider__track-container">\
							<div class="mdc-slider__track"></div>\
						</div>\
						<div class="mdc-slider__thumb-container">\
							<div class="mdc-slider__pin">\
								<span class="mdc-slider__pin-value-marker" style="font-size:8px"></span>\
							</div>\
							<svg class="mdc-slider__thumb" width="21" height="21">\
								<circle cx="10.5" cy="10.5" r="7.875"></circle>\
							</svg>\
							<div class="mdc-slider__focus-ring"></div>\
						</div>\
					</div>';
			return ('<div>'+text+' : <span style="color:#018786"><span style="margin-left: 5px;"></span>'+prefix+'<span data-current="'+text+'">'+current+'</span>'+suffix+'</span></div>'+slider);
		}
	}

	window.APPLY = function(data, elem){
		REACTIVE_MORTGAGE_CALCULATOR.data = data;
		REACTIVE_MORTGAGE_CALCULATOR.base = $(elem);
		REACTIVE_MORTGAGE_CALCULATOR.init();
	};
	
	if(typeof savedData !== 'undefined'){
		var elem = $('#reactive-dependency');
		if(elem.length == 0){
			elem = 'body';
		}
		window.APPLY(savedData, elem);
	}
});