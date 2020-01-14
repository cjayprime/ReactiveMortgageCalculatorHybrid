//Delete button for lenders needs to delete on the server too


import React from 'react';
import { inject, observer } from 'mobx-react';

//Material
import { withStyles, Paper, Typography, TextField, FormControlLabel, Switch } from '@material-ui/core';

class LenderAndInterest extends React.Component {
	render() {
		const { store, classes } = this.props;
		return (
			<Paper elevation={0} className={classes.paperLayout}>
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
					withStyles(styles)(LenderAndInterest)
				)
			);