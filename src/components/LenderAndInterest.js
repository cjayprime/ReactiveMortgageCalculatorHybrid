import React from 'react';
import { inject, observer } from 'mobx-react';
import $ from 'jquery';

//Material
import { withStyles, Paper, Typography, TextField, FormControlLabel, Switch, Button, FormGroup, Fab, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

function DropZoneComponent(props) {
	const styles = {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '20px',
		borderWidth: 2,
		borderRadius: 2,
		borderColor: '#999',
		borderStyle: 'dashed',
		backgroundColor: 'inherit',
		color: '#000',
		outline: 'none',
		transition: 'border .24s ease-in-out',
		marginBottom: 10,
		backgroundImage: 'url( "'+props.parent.state.newLenderLogo+'" )',
		height: '50%',
		width: '90%'
	};
	
	const onDragStart = (e,v)=>{
		e.preventDefault();
		e.target.style.borderColor = '#000';
	}
	
	const onDragStop = (e,v)=>{
		e.target.style.borderColor = '#999';
	}
	
	const onDrag= (e,v)=>{
		e.preventDefault();
		e.target.style.borderColor = '#999';
	}
	
	const onDrop = function(e,v){
		e.target.style.borderColor = '#999';
		e.preventDefault();
		var f = e.dataTransfer.files;
		var self = e.target;
		var reader = new FileReader();
		reader.onload = event => {
			var elem = $(self);
			
			if($(self)[0].tagName === 'P')
			elem = $(self).parent('div');
			
			elem.css({backgroundImage: 'url( "'+reader.result+'" )'});
			props.parent.setState({newLenderLogo: reader.result.split('base64,')[1]});
		};
		reader.readAsDataURL(f[0]);
	}
  
	return (
		<div style={styles}
		onDrag={onDrag}
		onDrop={onDrop}
		onDragEnter={onDragStart}
		//onDragStart={onDragStart}
		onDragOver={onDragStart}
		//onDragEnd={onDragStop}
		onDragExit={onDragStop}
		onDragLeave={onDragStop}>
			<input type="file" style={{opacity:0.0001,position:'absolute',left:-1000,top:-1000}} />
			<Typography variant="subtitle2" component="p" style={{color:"#000",marginBottom: 10, fontSize: 15, textAlign: 'center'}}>Drag and drop or click to select an image for the Lenders logo</Typography>
		</div>
	);
}

const Dropzone = inject('store')(observer(DropZoneComponent));

class LenderAndInterest extends React.Component {
	
	state = {
		adding: false,
		currentLender: '',
		currentLenderIndex: 0,
		newLenderLogo: '',
		newLenderName: '',
		errorNewLenderLogo: '',
		errorNewLenderName: ''
	}
	
	constructor(props){
		super(props);
		this.state.currentLender = typeof props.store.lenders[0] === 'undefined' ? '' : props.store.lenders[0].name;
	}
	
	render() {
		const { store, classes } = this.props;
		return (
			<Paper elevation={0} className={classes.paperLayout}>
				
				{!this.state.adding 
				?
					<div style={{width: '100%'}}>
						<TextField
							id="standard-select-currency"
							select
							label={<Typography variant="subtitle2" component="span" style={{color:"#000",marginBottom: 10, fontSize: 16}}>Select a Lender</Typography>}
							className={classes.textField}
							value={this.state.currentLenderIndex}
							onChange={(e)=>{
								var i = e.target.value;
								this.setState({currentLenderIndex: i, currentLender: store.lenders[i].name});
								this.forceUpdate();
							}}
							style={{width: '60%', fontSize: 12, fontFamily: 'Lato', marginTop:-10}}
							SelectProps={{
								MenuProps: {
									className: classes.menu,
								},
							}}
							margin="normal"
						>
						{store.lenders.map((option,i) => (
							<MenuItem key={i} value={i}>
							{option.name}
							</MenuItem>
						))}
						</TextField>
						
						<Dropzone parent={this} />
						
						<FormGroup row={true}>
							<TextField
								style={{width:'50%'}}
								label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Lender Name</Typography>}
								classes={{root:classes.fontStyle}}
								placeholder="Lender Name"
								color="secondary"
								value={this.state.newLenderName}
								onChange={(e)=>{
									this.setState({newLenderName: e.target.value});
									this.forceUpdate();
								}}
								variant="outlined"
								multiline={false}
							/>
							<Fab color="primary" style={{marginLeft:15,marginRight:15,fontSize: 11}} variant="extended" aria-label="Delete" onClick={()=>{
								var error = 0;
								
								if(!this.state.newLenderLogo)
								error = 1;
								
								if(!this.state.newLenderName)
								error = 2;
								
								if(error === 2)alert('Enter the Lender\'s name');
								
								if(error === 1)alert('Select an image for the Lender\'s logo');
								
								/*Add a new lender*/
								if(error === 0){
									store.lenders.push(JSON.parse(JSON.stringify(store.interestRate)));
									var index = store.lenders.length - 1;
									store.lenders[index].name = this.state.newLenderName;
									store.lenders[index].logo = this.state.newLenderLogo;
									store.interestRate = store.lenders[index];
									
									this.setState({adding: true, currentLenderIndex: index, currentLender: this.state.newLenderName});
								}
								this.forceUpdate();
							}}>
								<AddIcon style={{fontSize: 19}} />
								Add
							</Fab>
							<Fab color="secondary" variant="extended" aria-label="Delete" style={{fontSize: 11}} onClick={()=>{
								var error = 0;
								
								if(!this.state.currentLender)
								error = 1;
								
								if(error === 1)alert('Select a Lender');
								
								/*Edit old lender*/
								if(error === 0){
									this.setState({adding: true});
									store.interestRate = store.lenders[this.state.currentLenderIndex];
								}
								this.forceUpdate();
							}}>
								<EditIcon style={{fontSize: 16}} />
								Edit
							</Fab>
						</FormGroup>
					</div>
				
				:
					<>
						<div style={{display: 'flex', justifyContent: 'space-between'}}>
							<Button variant="contained" color="primary" style={{fontSize:11}}
							onClick={()=>{
								this.setState({adding: false});
								store.lenders[this.state.currentLenderIndex] = store.interestRate;
								this.forceUpdate();
							}}>
								Save and Close
								<SaveIcon />
							</Button>
							<Button variant="contained" color="secondary" style={{fontSize:11}}
							onClick={()=>{
								var i = this.state.currentLenderIndex - 1;
								i = typeof store.lenders[i] === 'undefined' ? 0 : i;
								var n = typeof store.lenders[i] === 'undefined' ? '' : store.lenders[i].name;
								this.setState({adding: false, currentLenderIndex: i, currentLender: n});
								
								delete store.lenders[this.state.currentLenderIndex];
								store.lenders = store.lenders.filter(function(v){
									return v != null;
								});
								this.forceUpdate();
							}}>
								Delete
								<DeleteIcon className={classes.rightIcon} />
							</Button>
						</div>
				
				
				
				
				
						<div style={{marginTop:20}}>Lender{'\''}s  Loan</div>
						<Typography component="div" style={{fontSize:12,marginTop:20}}>Lender{'\''}s Loan Is</Typography>
						<span style={{marginBottom:20}}>
							<FormControlLabel
								control={
									<Switch
										checked={store.interestRate.loanType === 'fixed'}
										onChange={(e,v)=>{
											if(store.interestRate.loanType === 'fixed'){
												store.interestRate.loanType = 'variable';
											}else{
												store.interestRate.loanType = 'fixed';
											}
											this.forceUpdate();
										}}
										color="primary"
									/>
								}
								label={<Typography component="div" style={{fontSize:12}}>{store.interestRate.loanType.charAt(0).toUpperCase() +''+ store.interestRate.loanType.slice(1)}</Typography>}
							/>
						</span>
						
						<Typography component="div" style={{fontSize:12,marginTop:20}}>Lender{'\''}s Loan In</Typography>
						<span style={{marginBottom:20}}>
							<FormControlLabel
								control={
									<Switch
										checked={store.interestRate.loanValueType === 'amount'}
										onChange={(e,v)=>{
											if(store.interestRate.loanValueType === 'amount'){
												store.interestRate.loanValueType = 'percent';
											}else{
												store.interestRate.loanValueType = 'amount';
											}
											this.forceUpdate();
										}}
										color="primary"
									/>
								}
								label={<Typography component="div" style={{fontSize:12}}>{store.interestRate.loanValueType.charAt(0).toUpperCase() +''+ store.interestRate.loanValueType.slice(1)}</Typography>}
							/>
						</span>
						
						<TextField
							label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Loan {((store.interestRate.loanType === 'variable') ? ' - Default' : '')} {store.interestRate.loanValueType === 'amount' ? '($)' : '(%)'}</Typography>}
							classes={{root:classes.fontStyle}}
							placeholder="Loan"
							color="secondary"
							value={store.interestRate.loan[store.interestRate.loanType].default}
							onChange={(e)=>{
								store.interestRate.loan[store.interestRate.loanType].default = e.target.value;
								this.forceUpdate();
							}}
							margin="normal"
							fullWidth
							variant="filled"
							multiline={false}
						/>
				
						<TextField
							label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Start after (months)</Typography>}
							classes={{root:classes.fontStyle}}
							placeholder="Start after (months)"
							color="secondary"
							value={store.interestRate.startAfter}
							onChange={(e)=>{
								store.interestRate.startAfter = e.target.value;
								this.forceUpdate();
							}}
							margin="normal"
							fullWidth
							variant="filled"
							multiline={false}
						/>
						
						<div style={{marginTop:20}}>Lender{'\''}s  Interest Rate</div>
						<TextField
							label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Interest Rate Text</Typography>}
							classes={{root:classes.fontStyle}}
							placeholder="Interest Text"
							color="secondary"
							value={store.interestRate.text}
							onChange={(e)=>{
								store.interestRate.text = e.target.value;
								this.forceUpdate();
							}}
							margin="normal"
							fullWidth
							variant="filled"
							multiline={false}
						/>
						
						<Typography component="div" style={{fontSize:12,marginTop:20}}>Interest Rate Is</Typography>
						<span style={{marginBottom:20}}>
							<FormControlLabel
								control={
									<Switch
										checked={store.interestRate.type === 'fixed'}
										onChange={(e,v)=>{
											if(store.interestRate.type === 'fixed'){
												store.interestRate.type = 'variable';
											}else{
												store.interestRate.type = 'fixed';
											}
											this.forceUpdate();
										}}
										color="primary"
									/>
								}
								label={<Typography component="div" style={{fontSize:12}}>{store.interestRate.type.charAt(0).toUpperCase() +''+ store.interestRate.type.slice(1)}</Typography>}
							/>
						</span>
						
						
						<TextField
							label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Interest Rate {((store.interestRate.type === 'variable') ? ' - Default' : '')}</Typography>}
							classes={{root:classes.fontStyle}}
							placeholder={"Interest Rate" + ((store.interestRate.type === 'variable') ? ' - Default' : '')}
							color="secondary"
							value={store.interestRate.type === 'variable' ? store.interestRate.value.variable.default : store.interestRate.value.fixed.default}
							onChange={(e)=>{
								if(store.interestRate.type === 'variable'){
									store.interestRate.value.variable.default = e.target.value;
								}else{
									store.interestRate.value.fixed.default = e.target.value;
								}
								this.forceUpdate();
							}}
							margin="normal"
							fullWidth
							variant="filled"
							multiline={false}
						/>
						
						{store.interestRate.type === 'variable' &&
						<>
							<TextField
								label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Interest Rate - Minimum</Typography>}
								classes={{root:classes.fontStyle}}
								placeholder="Interest Rate - Minimum"
								color="secondary"
								value={store.interestRate.value.variable.minimum}
								onChange={(e)=>{
									store.interestRate.value.variable.minimum = e.target.value;
									this.forceUpdate();
								}}
								margin="normal"
								fullWidth
								variant="filled"
								multiline={false}
							/>
							
							<TextField
								label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Interest Rate - Maximum</Typography>}
								classes={{root:classes.fontStyle}}
								placeholder="Interest Rate - Maximum"
								color="secondary"
								value={store.interestRate.value.variable.maximum}
								onChange={(e)=>{
									store.interestRate.value.variable.maximum = e.target.value;
									this.forceUpdate();
								}}
								margin="normal"
								fullWidth
								variant="filled"
								multiline={false}
							/>
						</>}
					</>}
				
			</Paper>
		);
	};
	
}

const styles = theme => {return {
	paperLayout: {
		height: '100%',
		overflow: 'auto',
		padding: theme.spacing(2),
		paddingTop: theme.spacing(3),
		backgroundColor: '#EEEEEE',
		fontFamily:'Lato'
	},
	fontStyle:{
		fontSize: 10,
		fontWeight: 500,
		fontFamily: 'Lato',
		lineHeight: '1.16667em',
		'& > *':{
			fontSize: 15,
			fontWeight: 500,
			fontFamily: 'Lato',
			lineHeight: '1.16667em'
		}
	}
}};

export default 
			inject('store')(
				observer(
					withStyles(styles)(LenderAndInterest)
				)
			);