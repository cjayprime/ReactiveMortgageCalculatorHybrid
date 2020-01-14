//uninstall react-google-charts

import React from 'react';
import { inject, observer } from 'mobx-react';

//jQuery
import $ from 'jquery';

//Material
import { withStyles, Typography, Grid, Paper, AppBar, Tabs, Tab, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from '@material-ui/core';

//Scripts
import PropertyValue from './components/PropertyValue.js';
import DownPayment from './components/DownPayment.js';
import LenderAndInterest from './components/LenderAndInterest.js';
import Tenure from './components/Tenure.js';
import TaxesAndCharges from './components/TaxesAndCharges.js';
import Others from './components/Others.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class App extends React.Component {
	
	constructor(){
		super();
		this.handleTabChange = this.handleTabChange.bind(this);
	}
	
	state = {
		currentTab: 0,
		MAJOR_COLOR: '#F2D531',
		openGetCode: false,
		htmlGetCode: '',
		scriptHtml: ''
	}
	
	render() {
		const { store, classes } = this.props;
		
		return (
			<React.Fragment>
				<Grid container className={classes.root} spacing={0}>
					<Grid item xs={4} className={classes.sideMenu}>
						<img alt="banner" src="images/banner.png" style={{width:'100%',height:'auto',marginTop:-25}}/>
						<Typography component="div" style={{fontFamily:'Lato',color:'#7f7f7f',textAlign:'center',fontSize:14,fontSpacing:20}}><i>Customizable, responsive and reactive mortgage calculator that gives you a soft landing.</i></Typography>
						
						<Paper elevation={0} style={{padding:20}}>
							<AppBar position="static" style={{background:'#000',color:'#FFF',fontWeight:'bolder'}}>
								<Tabs
									value={this.state.currentTab}
									onChange={this.handleTabChange}
									variant="scrollable"
									scrollButtons="auto"
									classes={{indicator:classes.indicatorStyle,scrollButtons:classes.scrollButtonsStyle}}
								>
									<Tab label="Property Value" textColor="inherit" className={classes.tab}/>
									<Tab label="Down Payment" textColor="inherit" className={classes.tab}/>
									<Tab label="Interest" textColor="inherit" className={classes.tab}/>
									<Tab label="Tenure" textColor="inherit" className={classes.tab}/>
									<Tab label="Taxes and Charges" textColor="inherit" className={classes.tab}/>
									<Tab label="Other" textColor="inherit" className={classes.tab}/>
								</Tabs>
							</AppBar>
							<Paper elevation={2} className={classes.paperSideMenu} style={{overflow:'auto',height: '40vh'}}>
								{this.state.currentTab === 0 && 
								
									<PropertyValue />
									
								}
								
								{this.state.currentTab === 1 && 
									
									<DownPayment />
									
								}
								
								{this.state.currentTab === 2 && 
									
									<LenderAndInterest />
									
								}
								
								{this.state.currentTab === 3 && 
									
									<Tenure />
									
								}
								
								{this.state.currentTab === 4 && 
									
									<TaxesAndCharges />
									
								}
								
								{this.state.currentTab === 5 && 
									
									<Others />
									
								}
							</Paper>
						</Paper>
						<Typography className={classes.footer}>
							&copy;{' '} 
							<a style={{textDecoration:'none',color:'#FFF',fontSize:11}} rel="noopener noreferrer" target="_blank" href="https://www.grey-loft.com">
								<i>Greyloft</i>
							</a>
							&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<a style={{textDecoration:'none',color:'#FFF',fontSize:11}} rel="noopener noreferrer" target="_blank" href="mailto:support@grey-loft.com">
								<i>Click here for support</i>
							</a>
						</Typography>
					</Grid>
					<Grid item xs={8} className={classes.sample}>
						<Paper elevation={4} className={classes.paperSample}>
							<Paper elevation={0} style={{padding:10,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor: '#EEEEEE'}}>
								<Typography component="p" style={{fontSize:12,fontFamily:'Lato'}}>
									<i>This is a live breakdown of the mortgage payment</i>
								</Typography>
								<Button variant="outlined" style={{padding:10,border:0,fontFamily:'Lato',fontSize:12,textTransform:'none',background:this.state.MAJOR_COLOR,color:'#000',marginLeft:25}} onClick={async ()=>{
									var scriptHtml = this.state.scriptHtml;
									if(!this.state.scriptHtml)
									scriptHtml = await this.loadScript();
									
									this.setState({scriptHtml:scriptHtml},()=>{
										this.setState({openGetCode:true,htmlGetCode:'<script id="reactive-dependency" src="https://code.jquery.com/jquery-1.11.1.js" type="application/javascript"></script>\n<script>\n' + this.state.scriptHtml + '\n\n savedData = ' + JSON.stringify(store) + '\n</script>'});
									});
								}}>Get embed code</Button>
								
								<Dialog
								open={this.state.openGetCode}
								TransitionComponent={Transition}
								keepMounted
								onClose={()=>{}}
								style={{zIndex:1000000}}
								>
									<textarea id="copy-textarea" style={{width:0,height:0,left:-1000,top:-1000,position:'absolute'}} value={this.state.htmlGetCode} onChange={()=>{}}/>
									<DialogTitle>
										Copy and paste this code within the footer section of your project or website.
									</DialogTitle>
									<DialogContent>
										<DialogContentText component="span" style={{overflow:'hidden'}}>
											<figure><code>
												{this.state.htmlGetCode}
											</code></figure>
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button onClick={()=>{this.setState({openGetCode:false});}} color="primary">
											Close
										</Button>
										<Button onClick={()=>{
											$('#copy-textarea')[0].select();
											document.execCommand('copy');
											this.setState({openGetCode:false});
										}} color="primary">
											Copy
										</Button>
									</DialogActions>
								</Dialog>
							</Paper>
							<Paper id="reactive-sample" elevation={0} style={{overflow:'auto',position:'relative',background:'#fff',justifyContent:'space-between',alignSelf:'center',height:'100%',width:'100%'}}>
								
							</Paper>
						</Paper>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	};
	
	handleTabChange(e,value){
		this.setState({currentTab:value});
	};
	
	loadScript = async function(){
		var src = $('#reactive-script').attr('src');
		var script = await $.get(src);
		return script;
	};
}

const styles = theme => ({
	root: {
		height: '100vh',
		overflow: 'hidden'
	},
	tab:{
		fontSize:12,
		textTransform:'none'
	},
	sideMenu: {
		height: '100%',
		maxHeight: '100%',
		background:'#FFF',
		display:'flex',
		flexDirection:'column',
		justifyContent:'center',
		position:'relative'//So the footer is in place
	},
	sample: {
		height: '100%',
	},
	paperSideMenu:{
		height: '100%',
		color: theme.palette.text.secondary,
		display:'flex',
		flexDirection:'column',
		justifyContent:'space-between',
		paddingBottom:10,
		backgroundColor: '#EEEEEE'
	},
	paperSample:{
		height: '100%',
		color: theme.palette.text.secondary,
		padding: 15,
		display:'flex',
		flexDirection:'column',
		justifyContent:'space-between',
		backgroundColor: '#EEEEEE'
	},
	control: {
		padding: theme.spacing(2),
	},
	indicatorStyle:{
		background:'#F2D531'
	},
	scrollButtonsStyle:{
		color:'#F2D531'
	},
	footer: {
		color:'#FFF',
		background:'#000',
		width:'100%',
		height:20,
		paddingTop:5,
		paddingBottom:5,
		textAlign:'center',
		fontFamily: 'Lato',
		fontSize:12,
		bottom:0,
		position:'absolute'
	}
});

export default 
			inject('store')(
				observer(
					withStyles(styles)(App)
				)
			);