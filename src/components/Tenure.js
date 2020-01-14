import React from 'react';
import { inject, observer } from 'mobx-react';

//Material
import { withStyles, Paper, Typography, TextField, FormControlLabel, Switch } from '@material-ui/core';

class Tenure extends React.Component {
	
	state = {
	}
	
	render() {
		const { store, classes } = this.props;
		
		return (
			<Paper elevation={0} className={classes.paperLayout}>
				
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Tenure Text</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder="Tenure Text"
					color="secondary"
					value={store.tenure.text}
					onChange={(e)=>{
						store.tenure.text = e.target.value;
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
					value={store.tenure.startAfter}
					onChange={(e)=>{
						store.tenure.startAfter = e.target.value;
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
				<Typography component="div" style={{fontSize:12,marginTop:20}}>Tenure Is</Typography>
				<span style={{marginBottom:20}}>
					<FormControlLabel
						control={
							<Switch
								checked={store.tenure.type === 'fixed'}
								onChange={(e,v)=>{
									if(store.tenure.type === 'fixed'){
										store.tenure.type = 'variable';
									}else{
										store.tenure.type = 'fixed';
									}
									this.forceUpdate();
								}}
								color="primary"
							/>
						}
						label={<Typography component="div" style={{fontSize:12}}>{store.tenure.type.charAt(0).toUpperCase() +''+ store.tenure.type.slice(1)}</Typography>}
					/>
				</span>
				
				
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Tenure {((store.tenure.type === 'variable') ? ' - Default' : '')} (Year)</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder={"Tenure" + ((store.tenure.type === 'variable') ? ' - Default' : '')}
					color="secondary"
					value={store.tenure.type === 'variable' ? store.tenure.value.variable.default : store.tenure.value.fixed.default}
					onChange={(e)=>{
						if(store.tenure.type === 'variable'){
							store.tenure.value.variable.default = e.target.value;
						}else{
							store.tenure.value.fixed.default = e.target.value;
						}
						this.forceUpdate();
					}}
					margin="normal"
					fullWidth
					variant="filled"
					multiline={false}
				/>
				
				{store.tenure.type === 'variable' &&
				<>
					<TextField
						label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Tenure - Minimum (Year)</Typography>}
						classes={{root:classes.fontStyle}}
						placeholder="Tenure - Minimum"
						color="secondary"
						value={store.tenure.value.variable.minimum}
						onChange={(e)=>{
							store.tenure.value.variable.minimum = e.target.value;
							this.forceUpdate();
						}}
						margin="normal"
						fullWidth
						variant="filled"
						multiline={false}
					/>
					
					<TextField
						label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Tenure - Maximum (Year)</Typography>}
						classes={{root:classes.fontStyle}}
						placeholder="Tenure - Maximum"
						color="secondary"
						value={store.tenure.value.variable.maximum}
						onChange={(e)=>{
							store.tenure.value.variable.maximum = e.target.value;
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
					withStyles(styles)(Tenure)
				)
			);