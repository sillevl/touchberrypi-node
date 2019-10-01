import { table } from 'table';
const logSymbols = require('log-symbols');
const I2c = require('i2c-bus');

const deviceList: { device: string, address: number, name: string}[] = [
	{ device: 'QT1070', address: 0x1b, name: 'Capacitive touch sensor' },
	{ device: 'TCL59116', address: 0x60, name: 'LED driver' },
	{ device: 'HTS221', address: 0x5f, name: 'Temperature sensor' },
	{ device: 'LSM6DSM', address: 0x6a, name: 'Accelero / Gyroscope' },
	{ device: 'LSM303', address: 0x19, name: 'Accelerometer' },
	{ device: 'LSM303', address: 0x1e, name: 'Magnetometer' },
	{ device: '24AA64', address: 0x50, name: 'EEPROM' }
];

export default class Check {

	private i2c: any;
	public constructor() {
		this.i2c = I2c.openSync(1);
		this.i2c.scan((err: any, devices: any) => {
			const results: any = [];
			deviceList.forEach( (dev: {device:string, address: number, name: string} ) => {
				const symbol = devices.includes(dev.address) ? logSymbols.success : logSymbols.error;
				results.push([symbol, dev.device, dev.name]);				
			});
			const output = table(results, {singleLine: true});
			console.log(output);
		});
	}
}

