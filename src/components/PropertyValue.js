import React from 'react';
import { inject, observer } from 'mobx-react';

//Material
import { withStyles, Paper, Typography, TextField, FormControlLabel, Switch } from '@material-ui/core';

class PropertyValue extends React.Component {
	
	state = {
	}
	
	render() {
		const { store, classes } = this.props;
		
		return (
			<Paper elevation={0} className={classes.paperLayout}>
				
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Property Value Text</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder="Property Value Text"
					color="secondary"
					value={store.propertyValue.text}
					onChange={(e)=>{
						store.propertyValue.text = e.target.value;
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
				<Typography component="div" style={{fontSize:12,marginTop:20}}>Property Value Is</Typography>
				<span style={{marginBottom:20}}>
					<FormControlLabel
						control={
							<Switch
								checked={store.propertyValue.type === 'fixed'}
								onChange={(e,v)=>{
									if(store.propertyValue.type === 'fixed'){
										store.propertyValue.type = 'variable';
									}else{
										store.propertyValue.type = 'fixed';
									}
									this.forceUpdate();
								}}
								color="primary"
							/>
						}
						label={<Typography component="div" style={{fontSize:12}}>{store.propertyValue.type.charAt(0).toUpperCase() +''+ store.propertyValue.type.slice(1)}</Typography>}
					/>
				</span>
				
				
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Property Value {((store.propertyValue.type === 'variable') ? ' - Default' : '')}</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder={"Property Value" + ((store.propertyValue.type === 'variable') ? ' - Default' : '')}
					color="secondary"
					value={store.propertyValue.type === 'variable' ? store.propertyValue.value.variable.default : store.propertyValue.value.fixed.default}
					onChange={(e)=>{
						if(store.propertyValue.type === 'variable'){
							store.propertyValue.value.variable.default = e.target.value;
						}else{
							store.propertyValue.value.fixed.default = e.target.value;
						}
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
				{store.propertyValue.type === 'variable' &&
				<>
					<TextField
						label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Property Value - Minimum</Typography>}
						classes={{root:classes.fontStyle}}
						placeholder="Property Value - Minimum"
						color="secondary"
						value={store.propertyValue.value.variable.minimum}
						onChange={(e)=>{
							store.propertyValue.value.variable.minimum = e.target.value;
							this.forceUpdate();
						}}
						margin="normal"
						fullWidth
						variant="filled"
						multiline={false}
					/>
					
					<TextField
						label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Property Value - Maximum</Typography>}
						classes={{root:classes.fontStyle}}
						placeholder="Property Value - Maximum"
						color="secondary"
						value={store.propertyValue.value.variable.maximum}
						onChange={(e)=>{
							store.propertyValue.value.variable.maximum = e.target.value;
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
					withStyles(styles)(PropertyValue)
				)
			);