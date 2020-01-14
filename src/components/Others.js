import React from 'react';
import { inject, observer } from 'mobx-react';

//Material
import { withStyles, Paper, Typography, TextField } from '@material-ui/core';

class Others extends React.Component {
	
	state = {
	}
	
	render() {
		const { store, classes } = this.props;
		
		return (
			<Paper elevation={0} className={classes.paperLayout}>
				
				<TextField
					label={<Typography variant="subtitle2" component="span" style={{color:"#999",fontSize: 13}}>Currency Symbol</Typography>}
					classes={{root:classes.fontStyle}}
					placeholder="Currency Symbol"
					color="secondary"
					value={store.others.currency.symbol}
					onChange={(e)=>{
						store.others.currency.symbol = e.target.value;
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
					withStyles(styles)(Others)
				)
			);