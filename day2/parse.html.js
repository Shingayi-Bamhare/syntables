var common = require('./common.js')
var builder = require('xmlbuilder')

function InputString(filename)
{
	var buffer = fs.readFileSync(filename)
	var s = buffer.toString('utf8')
	var m = JSON.parse(s)
	
	var html = builder.create('html', {headless: true, standalone: false})
	var head = html.ele('head')
	
	var module
	for(var t in m.tables)
	{
		module = m.tables[t].name
		break
	}
	
	head.ele('title', {}, module)
	head.ele('link', {rel:"stylesheet", type:"text/css", href:"mystyle.css"})
		
	var body = html.ele('body')
	body.ele('h1', {}, module)
	body.ele('p', {}, m.name)
	
	for(var t in m.tables)
	{
		var table = body.ele('table')
		var row = table.ele('tr')
		row.ele('th', {}, "Name")
		row.ele('th', {}, "Type")
		
		for(var f in m.tables[t].fields)
		{
			row = table.ele('tr')
			row.ele('td', {}, m.tables[t].fields[f].name)
			row.ele('td', {}, m.tables[t].fields[f].type)
		}
	}	
	
	var xmlString = html.end({pretty: true})
	
	return xmlString
}

exports.InputString = InputString

