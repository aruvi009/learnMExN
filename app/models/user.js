const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * BCRYPT package info : https://www.npmjs.com/package/bcrypt
 */
const bcrypt = require('bcrypt'); 
const SALT_FACTOR = 10;

//Define Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Field is required!'],
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  created_at: Date,
  updated_at: Date
  },
  {
    autoCreate: true,
  });

/**
 * DOC URL : https://mongoosejs.com/docs/middleware.html#pre * 
 * 
 */
userSchema.pre('save', function (next) {
  

  var user = this;
  //PASSWORD field hash
  // check if password is present and is modified.
  if (user.password && user.isModified('password')) {
    var initPass = user.password;

    user.password = encryptPassword(initPass);
  }

  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  user.updated_at = currentDate;
  
    // if created_at doesn't exist, add to that field
    if (!user.created_at)
      user.created_at = currentDate;

  next();
});

/**
 * DOC URL : https://mongoosejs.com/docs/middleware.html#notes
 * 
 * Pre and post save() hooks are not executed on update(), updateOne(), findOneAndUpdate()
 * For every updateOne() call, you would use the following custom pre hook.
 * 
 */
userSchema.pre('updateOne', async function(next) {
  const update = this.getUpdate();
  
  //Version field update
  update.$inc = update.$inc || {};
  update.$inc.__v = 1;
  
  /**
   * Get password field of current document
   * 
   * Since in our User schema, we defined password field should not return in select statement (select : false),
   * we will have to force the password field value to show in the find One query with .select("+password")
   *  
   * */ 
  const docToUpdate = await this.model.findOne(this.getQuery()).select("+password");

  //Check password if same as existing password hash
  if ( update.$set.password && !comparePassword(update.$set.password, docToUpdate.password)) {
    var initPass = update.$set.password;
    update.$set.password = encryptPassword(initPass);
  }
  else {
    //same password, so password not updating
    delete update.$set.password;
  }
  
  next();
});

/**
 * DOC INFO : https://mongoosejs.com/docs/guide.html#methods
 * 
 * Example of an Instance method * 
 * This can be called after the User object is initialised in the route.
 * 
 */
userSchema.methods.dudify = function () {
  // add some stuff to the users name
  this.name = this.name ? this.name + '-dude' : "";

  return this.name;
};

//Function to hash and return the plain text password
function encryptPassword(plainTextPassword) {
  if (!plainTextPassword) {
    return ''
  } else {
    var salt = bcrypt.genSaltSync(SALT_FACTOR);
    return bcrypt.hashSync(plainTextPassword, salt);
  }
}

//Function to compare the plain text password against the hashed password
function comparePassword(myPlaintextPassword, hash) {
  return bcrypt.compareSync(myPlaintextPassword, hash);
}

//Create User model from the defined user schema
var User = mongoose.model('User', userSchema);
module.exports = User;