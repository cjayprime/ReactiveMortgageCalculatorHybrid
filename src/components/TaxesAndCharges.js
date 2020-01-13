import React from 'react';
import { inject, observer } from 'mobx-react';

//Material
import { withStyles, Paper, Typography, TextField } from '@material-ui/core';

class PropertyValue extends React.Component {
	
	state = {
	}
	
	render() {
		const { store, classes } = this.props;
		
		return (
			<Paper elevation={0} className={classes.paperLayout}>
				
				
				<div>Property Tax</div>
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Property Tax Text</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder="Property Tax Text"
					color="secondary"
					value={store.taxAndCharges.property.text}
					onChange={(e)=>{
						store.taxAndCharges.property.text = e.target.value;
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Property Tax - Default (% Per Year)</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder="Property Tax - Default (% Per Year)"
					color="secondary"
					value={store.taxAndCharges.property.default}
					onChange={(e)=>{
						store.taxAndCharges.property.default = e.target.value;
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Property Tax - Minimum</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder="Property Tax - Minimum"
					color="secondary"
					value={store.taxAndCharges.property.minimum}
					onChange={(e)=>{
						store.taxAndCharges.property.minimum = e.target.value;
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Property Tax - Maximum</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder="Property Tax Text"
					color="secondary"
					value={store.taxAndCharges.property.maximum}
					onChange={(e)=>{
						store.taxAndCharges.property.maximum = e.target.value;
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
				
				
				
				
				
				<div style={{marginTop:50}}>Annual Hazard</div>
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Annual Hazard Text</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder="Annual Hazard Text"
					color="secondary"
					value={store.taxAndCharges.annualHazard.text}
					onChange={(e)=>{
						store.taxAndCharges.annualHazard.text = e.target.value;
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Annual Hazard - Default (Per Year)</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder="Annual Hazard - Default (Per Year)"
					color="secondary"
					value={store.taxAndCharges.annualHazard.default}
					onChange={(e)=>{
						store.taxAndCharges.annualHazard.default = e.target.value;
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Annual Hazard - Minimum</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder="Annual Hazard - Minimum"
					color="secondary"
					value={store.taxAndCharges.annualHazard.minimum}
					onChange={(e)=>{
						store.taxAndCharges.annualHazard.minimum = e.target.value;
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Annual Hazard - Maximum</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder="Annual Hazard Text"
					color="secondary"
					value={store.taxAndCharges.annualHazard.maximum}
					onChange={(e)=>{
						store.taxAndCharges.annualHazard.maximum = e.target.value;
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
				
				
				
				
				
				<div style={{marginTop:50}}>Mortgage Insurance</div>
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Mortgage Insurance Text</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder="Mortgage Insurance Text"
					color="secondary"
					value={store.taxAndCharges.mortgageInsurance.text}
					onChange={(e)=>{
						store.taxAndCharges.mortgageInsurance.text = e.target.value;
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Mortgage Insurance</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder="Mortgage Insurance"
					color="secondary"
					value={store.taxAndCharges.mortgageInsurance.default}
					onChange={(e)=>{
						store.taxAndCharges.mortgageInsurance.default = e.target.value;
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Mortgage Insurance - Minimum</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder="Mortgage Insurance - Minimum"
					color="secondary"
					value={store.taxAndCharges.mortgageInsurance.minimum}
					onChange={(e)=>{
						store.taxAndCharges.mortgageInsurance.minimum = e.target.value;
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Mortgage Insurance - Maximum</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder="Mortgage Insurance Text"
					color="secondary"
					value={store.taxAndCharges.mortgageInsurance.maximum}
					onChange={(e)=>{
						store.taxAndCharges.mortgageInsurance.maximum = e.target.value;
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
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
					withStyles(styles)(PropertyValue)
				)
			);