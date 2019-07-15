
const csvFilePath = './inputDoc.csv';
const csv = require('csvtojson');
const fs = require('fs');

csv().fromFile(csvFilePath).then((data) => {
    // console.log(data);
    // console.log(data.zip);
    var myArray = data;
    var temp = [];

    myArray.forEach((value) => {

        var fname, lname, email, add, city, country, state, zip, oidc, pwd, profile, identifier, id;
        var zip_len = value.zip.length;



        if (value.firstName == '') {
            this.fname = 'null';
        } else {
            this.fname = value.firstName;
        }

        if (value.lastName == '') {
            this.lname = 'null';
        } else {
            this.lname = value.lastName;
        }

        if (value.email == '') {
            this.email = 'null';
        } else {
            this.email = value.email;
        }

        if (value.address == '') {
            this.add = 'null';
        } else {
            this.add = value.address;
        }

        if (value.city == '') {
            this.city = 'null';
        } else {
            this.city = value.city;
        }

        if (value.country == '') {
            this.country = 'null';
        } else {
            this.country = value.country;
        }

        if (value.state == '') {
            this.state = 'null';
        } else {
            this.state = value.state;
        }

        if (value.zip == '') {
            this.zip = 'null';
        } else if (zip_len < 5) {
            for (i = zip_len; i < 5; i++) {
                value.zip = '0' + value.zip;
            }
            this.zip = value.zip;
        } else {
            this.zip = value.zip;
        }

        if (value.oidcDataupdatedat == '') {
            this.oidc = 'null';
        } else {
            this.oidc = value.oidcDataupdatedat;
        }

        if (value.password == '') {
            this.pwd = 'null';
        } else {
            var JsonPwd = JSON.parse(value.password);
            this.pwd = JsonPwd.value;
        }

        if (value.profile == '') {
            this.identifier = 'null';
            this.id = 'null';
        } else {
            var jsonProfile = JSON.parse(value.profile);
            this.identifier = jsonProfile[0].accessCredentials.type;
            this.id = jsonProfile[0].accessCredentials.uid;
        }


        temp.push({
            "profile": {
                "firstName": this.fname,
                "lastName": this.lname,
                "email": this.email,
                "address": this.add,
                "city": this.city,
                "country": this.country,
                "state": this.state,
                "zip": this.zip,
                "oidcDataupdatedat": {
                    "updated_at": this.oidc
                },
                "password": {
                    "value": this.pwd
                },
                "profile": {
                    "identifier": this.identifier,
                    "id": this.id
                }

            }
        })
    });


    var jsonData = JSON.stringify(temp);
    fs.writeFile('outputDoc.json', jsonData, 'utf8', () => {
        console.log('Completed');
    });
});
