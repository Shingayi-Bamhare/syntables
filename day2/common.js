
function ModuleName(name) {
    this.name = name
}

function Table(name, collectionName) {
    this.name = name
    this.collectionName = collectionName
}

function Field(ordinal, tableName, name, type) {
    this.ordinal = ordinal
    this.tableName = tableName
    this.name = name
    this.type = type
    this.defaultValue = ""
    this.keys = false
    this.nullable = true
}

function Export(name) {
    this.name = name
}

function Index(tableName, name) {
	this.tableName = tableName
	this.name = name
}

function IndexedField(tableName, indexName, fieldName, ordinal) {
	this.tableName = tableName
	this.indexName = indexName
	this.fieldName = fieldName
	this.ordinal = ordinal
}


exports.ModuleName = ModuleName
exports.Table = Table
exports.Field = Field
exports.Export = Export
exports.Index = Index
exports.IndexedField = IndexedField
