import React from 'react';
import { inject, observer } from 'mobx-react';

//Material
import { withStyles, Paper, Typography, TextField, FormControlLabel, Switch } from '@material-ui/core';

class DownPayment extends React.Component {
	
	state = {
	}
	
	render() {
		const { store, classes } = this.props;
		
		return (
			<Paper elevation={0} className={classes.paperLayout}>
				
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Down Payment Text</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder="Down Payment Text"
					color="secondary"
					value={store.downPayment.text}
					onChange={(e)=>{
						store.downPayment.text = e.target.value;
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
				<Typography component="div" style={{fontSize:12,marginTop:20}}>Down Payment Is</Typography>
				<span style={{marginBottom:20}}>
					<FormControlLabel
						control={
							<Switch
								checked={store.downPayment.type === 'fixed'}
								onChange={(e,v)=>{
									if(store.downPayment.type === 'fixed'){
										store.downPayment.type = 'variable';
									}else{
										store.downPayment.type = 'fixed';
									}
									this.forceUpdate();
								}}
								color="primary"
							/>
						}
						label={<Typography component="div" style={{fontSize:12}}>{store.downPayment.type.charAt(0).toUpperCase() +''+ store.downPayment.type.slice(1)}</Typography>}
					/>
				</span>
				
				<Typography component="div" style={{fontSize:12,marginTop:20}}>Down Payment In</Typography>
				<span style={{marginBottom:20}}>
					<FormControlLabel
						control={
							<Switch
								checked={store.downPayment.valueType === 'amount'}
								onChange={(e,v)=>{
									if(store.downPayment.valueType === 'amount'){
										store.downPayment.valueType = 'percent';
									}else{
										store.downPayment.valueType = 'amount';
									}
									this.forceUpdate();
								}}
								color="primary"
							/>
						}
						label={<Typography component="div" style={{fontSize:12}}>{store.downPayment.valueType.charAt(0).toUpperCase() +''+ store.downPayment.valueType.slice(1)}</Typography>}
					/>
				</span>
				
				
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999"}}>{
						"Down Payment" +
						((store.downPayment.valueType === 'amount') ? ' Amount' : ' Percent') + 
						((store.downPayment.type === 'variable') ? ' - Default' : '')}</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder={"Down Payment" + ((store.downPayment.type === 'variable') ? ' - Default' : '')}
					color="secondary"
					value={store.downPayment.type === 'variable' ? store.downPayment.value.variable.default : store.downPayment.value.fixed.default}
					onChange={(e)=>{
						if(store.downPayment.type === 'variable'){
							store.downPayment.value.variable.default = e.target.value;
						}else{
							store.downPayment.value.fixed.default = e.target.value;
						}
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
				{store.downPayment.type === 'variable' &&
				<>
					<TextField
						label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>{"Down Payment" + ((store.downPayment.valueType === 'amount') ? ' Amount' : ' Percent') + "- Minimum"}</Typography>}
						classes={{root:classes.fontStyle}}
						placeholder="Down Payment - Minimum"
						color="secondary"
						value={store.downPayment.value.variable.minimum}
						onChange={(e)=>{
							store.downPayment.value.variable.minimum = e.target.value;
							this.forceUpdate();
						}}
						margin="normal"
						fullWidth
						variant="filled"
						multiline={false}
					/>
					
					<TextField
						label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Down Payment {((store.downPayment.valueType === 'amount') ? ' Amount' : ' Percent')} - Maximum</Typography>}
						classes={{root:classes.fontStyle}}
						placeholder="Down Payment - Maximum"
						color="secondary"
						value={store.downPayment.value.variable.maximum}
						onChange={(e)=>{
							store.downPayment.value.variable.maximum = e.target.value;
							this.forceUpdate();
						}}
						margin="normal"
						fullWidth
						variant="filled"
						multiline={false}
					/>
				</>
				}
				
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
		fontSize: '1.3125rem',
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
					withStyles(styles)(DownPayment)
				)
			);