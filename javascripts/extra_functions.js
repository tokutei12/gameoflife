//wouldn't work if an element of the 2D array was another array
Array.prototype.compare2d = function(other){
	if(other.length != this.length)
		return false;
	for(var i = 0; i < this.length; i++){
		if(this[i].length != other[i].length)
			return false;
		for(var j = 0; j < this[i].length; j++){
			if(this[i][j] !== other[i][j])
				return false;
		}
	}
	return true;
}