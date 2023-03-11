
// its a utility function for controller to complete missing blood types


const bloodTypes = ['0-', '0+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']

function completeMissingBloodTypes(arr) {
  const simplifiedArr = arr.map((b) => b.blood_type)

  bloodTypes.forEach((a) => {
    if (simplifiedArr.indexOf(a) == -1)
      arr.push({ blood_type: a, num_of_blood: 0 })
  })

  return arr
}

module.exports = { completeMissingBloodTypes }
