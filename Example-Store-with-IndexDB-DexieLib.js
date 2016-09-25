var db = new Dexie("MyAppDB");

db.version(1).stores({
  folders: "++id,&path",
  files: "++id,filename,extension,folderId"
});

var Folder = db.folders.defineClass({
  id: Number,
  path: String,
  description: String
});

Folder.prototype.save = function () {
  return db.folders.put(this);
}

var File = db.files.defineClass({
  id: Number,
  filename: String,
  extension: String,
  folderId: Number,
  tags: [String]
});

File.prototype.save = function () {
  return db.files.put(this);
}

