var nools = require("nools")


var common = require("./common.js")

var ModuleName = common.ModuleName
var Table = common.Table
var Field = common.Field
var Export = common.Export

var Indent = 4


// Autogenerated with DRAKON Editor 1.28


function DataEngine(tables) {
    // item 91
    this.tables = {}
    // item 890001
    var _ind89 = 0;
    var _col89 = tables;
    var _len89 = _col89.length;
    while (true) {
        // item 890002
        if (_ind89 < _len89) {
            
        } else {
            break;
        }
        // item 890004
        var tableName = _col89[_ind89];
        // item 116
        var table = new FactTable(tableName)
        // item 87
        this.tables[tableName] = table
        // item 890003
        _ind89++;
    }
    // item 98
    this.select = DataEngine_select
    this.selectOne = DataEngine_selectOne
    this.insert = DataEngine_insert
}

function DataEngine_insert(row) {
    // item 104
    var tableName = row.constructor.name
    // item 105
    var table = this.tables[tableName]
    // item 106
    table.rows.push(row)
}

function DataEngine_select(tableName, condition) {
    // item 37
    var table = this.tables[tableName]
    // item 40
    var predicate = function (row) {
    	return rowMatcher(row, condition)
    }
    // item 41
    return table.rows.filter(predicate)
}

function DataEngine_selectOne(tableName, condition) {
    // item 71
    var found = this.select(
    	tableName,
    	condition
    )
    // item 74
    if (found.length == 1) {
        // item 73
        return found[0]
    } else {
        // item 78
        if (found.length == 0) {
            // item 82
            var message = "many rows found in " + tableName
            // item 77
            throw new Error(message)
        } else {
            // item 81
            return null
        }
    }
}

function FactTable(name) {
    // item 97
    this.name = name
    this.rows = []
}

function JsAssignment(left, right) {
    // item 171
    this.left = left
    this.right = right
    // item 211
    this.print = JsAssignment_Print
}

function JsAssignment_Print(output, depth) {
    // item 207
    var indent = makeIndent(depth)
    // item 201
    output.push(indent + this.left + " = " + this.right)
}

function JsFunction(name, params) {
    // item 178
    this.kids = []
    // item 177
    this.name = name
    this.params = params || []
    // item 210
    this.print = JsFunction_Print
}

function JsFunction_Print(output, depth) {
    // item 208
    var indent = makeIndent(depth)
    // item 190
    var header = indent + "function " + this.name + "(" +
    	this.params.join(", ") + ") {"
    // item 195
    output.push(header)
    // item 1910001
    var _ind191 = 0;
    var _col191 = this.kids;
    var _len191 = _col191.length;
    while (true) {
        // item 1910002
        if (_ind191 < _len191) {
            
        } else {
            break;
        }
        // item 1910004
        var kid = _col191[_ind191];
        // item 193
        kid.print(output, depth + 1)
        // item 1910003
        _ind191++;
    }
    // item 194
    output.push(indent + "}")
    output.push("")
}

function addJsExport(parent, name) {
    // item 164
    var assi = new JsAssignment(
    	"this." + name,
    	name
    )
    // item 165
    parent.kids.push(assi)
}

function addJsField(data, parent, field) {
    // item 157
    var assi = new JsAssignment(
    	"this." + field.name,
    	field.defaultValue
    )
    // item 158
    parent.kids.push(assi)
}

function addJsTable(data, parent, table) {
    // item 145
    var fields = data.select(
    	"Field",
    	{"tableName": table.name}
    )
    // item 146
    var fieldNames = fields.map(f => f.name)
    // item 147
    var recordCtr = new JsFunction(
    	table.name,
    	fieldNames
    )
    // item 148
    parent.kids.push(recordCtr)
    // item 1490001
    var _ind149 = 0;
    var _col149 = fields;
    var _len149 = _col149.length;
    while (true) {
        // item 1490002
        if (_ind149 < _len149) {
            
        } else {
            break;
        }
        // item 1490004
        var field = _col149[_ind149];
        // item 151
        addJsField(
        	data,
        	recordCtr,
        	field
        )
        // item 1490003
        _ind149++;
    }
}

function buildJavaScriptAst(data) {
    // item 122
    var module = data.selectOne("ModuleName", null)
    // item 125
    var moduleFun = new JsFunction(module.name)
    // item 123
    var tables = data.select("Table", null)
    // item 1260001
    var _ind126 = 0;
    var _col126 = tables;
    var _len126 = _col126.length;
    while (true) {
        // item 1260002
        if (_ind126 < _len126) {
            
        } else {
            break;
        }
        // item 1260004
        var table = _col126[_ind126];
        // item 128
        addJsTable(
        	data,
        	moduleFun,
        	table
        )
        // item 1260003
        _ind126++;
    }
    // item 124
    var exps = data.select("Export", null)
    // item 1290001
    var _ind129 = 0;
    var _col129 = exps;
    var _len129 = _col129.length;
    while (true) {
        // item 1290002
        if (_ind129 < _len129) {
            
        } else {
            break;
        }
        // item 1290004
        var exp = _col129[_ind129];
        // item 131
        addJsExport(
        	moduleFun,
        	exp.name
        )
        // item 1290003
        _ind129++;
    }
    // item 139
    return moduleFun
}

function createRulesEngine(ruleFile) {
    // item 257
    var options = {
    	name: "Transformation rules",
    	define: {
    		ModuleName: ModuleName,
    		Table: Table,
    		Field: Field,
    		Export: Export
    	},
    	scope: {
    	}
    }
    // item 254
    var flow = nools.compile(ruleFile, options)
    // item 253
    return flow
}

function getDefaultValue(field) {
    var _sw2170000_ = 0;
    // item 2170000
    _sw2170000_ = field.type;
    // item 2170001
    if (_sw2170000_ === "int") {
        // item 227
        return "0"
    } else {
        // item 2170002
        if (_sw2170000_ === "double") {
            // item 226
            return "0.0"
        } else {
            // item 2170003
            if (_sw2170000_ === "string") {
                
            } else {
                // item 2170004
                throw "Unexpected switch value: " + _sw2170000_;
            }
            // item 225
            return "\"\""
        }
    }
}

function initFlow(flow) {
    // item 12
    flow.rule("Export each table", [
        [Table, "table"]
     ], function (facts) {
        this.assert(new Export(facts.table.name))
    })
}

function makeIndent(depth) {
    // item 189
    return Array(depth * Indent).join(" ")
}

function makeTableList() {
    // item 115
    return [
    	"ModuleName",
    	"Table",
    	"Field",
    	"Export"
    ]
}

function outputFacts(session, onSuccess) {
    // item 236
    var tables = makeTableList()
    // item 241
    var data = new DataEngine(tables)
    // item 243
    var facts = session.getFacts()
    // item 2390001
    var _ind239 = 0;
    var _col239 = facts;
    var _len239 = _col239.length;
    while (true) {
        // item 2390002
        if (_ind239 < _len239) {
            
        } else {
            break;
        }
        // item 2390004
        var fact = _col239[_ind239];
        // item 242
        data.insert(fact)
        // item 2390003
        _ind239++;
    }
    // item 238
    onSuccess(data)
}

function rowMatcher(row, condition) {
    // item 56
    if (condition) {
        // item 600001
        var _ind60 = 0;
        var _col60 = condition;
        var _keys60 = Object.keys(_col60); 
        var _len60 = _keys60.length;
        while (true) {
            // item 600002
            if (_ind60 < _len60) {
                
            } else {
                // item 65
                return true
            }
            // item 600004
            var key = _keys60[_ind60]; var value = _col60[key];
            // item 62
            if (row[key] == value) {
                
            } else {
                // item 64
                return false
            }
            // item 600003
            _ind60++;
        }
    } else {
        // item 59
        return true
    }
}

function runRuleSystem(flow, inputFacts) {
    // item 265
    var session = flow.getSession()
    // item 2630001
    var _ind263 = 0;
    var _col263 = inputFacts;
    var _len263 = _col263.length;
    while (true) {
        // item 2630002
        if (_ind263 < _len263) {
            
        } else {
            break;
        }
        // item 2630004
        var fact = _col263[_ind263];
        // item 266
        session.assert(fact)
        // item 2630003
        _ind263++;
    }
    // item 267
    session.match()
    // item 268
    return session
}

function transformModel(ruleFile, inputFacts, onSuccess, onError) {
    // item 29
    var flow = createRulesEngine(ruleFile)
    // item 247
    var session = flow.getSession()
    // item 244
    var onDone = function() {
    	outputFacts(session, onSuccess)
    }
    // item 2450001
    var _ind245 = 0;
    var _col245 = inputFacts;
    var _len245 = _col245.length;
    while (true) {
        // item 2450002
        if (_ind245 < _len245) {
            
        } else {
            break;
        }
        // item 2450004
        var fact = _col245[_ind245];
        // item 248
        session.assert(fact)
        // item 2450003
        _ind245++;
    }
    // item 249
    session.match().then(onDone, onError)
}


exports.transformModel = transformModel
exports.buildJavaScriptAst = buildJavaScriptAst
