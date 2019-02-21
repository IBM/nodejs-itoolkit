const { expect } = require('chai');
const { iPgm, xmlToJson } = require('../../lib/itoolkit');

describe('iXml Functional Tests', () => {
    describe('iXml()', () => {
        it('regular <parm> contains by=\'val\'', () => {
            const pgm = new iPgm("MYPGM", {lib:"MYLIB", func: "MY_PROCEDURE"});

            pgm.addParam("", "1A", {by:"val"});
            pgm.addReturn("", "2A", {name:"output"});

            let lookAtXML=pgm.toXML();
            expect(lookAtXML).to.match(/<parm .*by='val'.*>/);
        });

        it('data structure <parm> contains by=\'val\'', () => {
            const pgm = new iPgm("MYPGM", {lib:"MYLIB", func: "MY_PROCEDURE"});

            const p_inds=[
              [0, "3s0"],
              [0, "7s0", {name:"ds_fld2"}]
            ];
            
            pgm.addParam(p_inds, {name:"inds", by:"val"});
            pgm.addReturn("", "2A", {name:"output"});
            
            let lookAtXML=pgm.toXML();
            expect(lookAtXML).to.match(/<parm .*by='val'.*>/);
        });

        it('regular <parm> contains by=\'val\', with io=\'both\'', () => {
            const pgm = new iPgm("MYPGM", {lib:"MYLIB", func: "MY_PROCEDURE"});

            pgm.addParam("", "1A", {by:"val", io:"both"});
            pgm.addReturn("", "2A", {name:"output"});

            let lookAtXML=pgm.toXML();
            expect(lookAtXML).to.match(/<parm .*by='val'.*>/);
            expect(lookAtXML).to.match(/<parm .*io='both'.*>/);
        });

        it('data structure <parm> contains by=\'val\', with io=\'both\'', () => {
            const pgm = new iPgm("MYPGM", {lib:"MYLIB", func: "MY_PROCEDURE"});

            const p_inds=[
              [0, "3s0"],
              [0, "7s0", {name:"ds_fld2"}]
            ];
            
            pgm.addParam(p_inds, {name:"inds", by:"val", io:"both"});
            pgm.addReturn("", "2A", {name:"output"});
            
            let lookAtXML=pgm.toXML();
            expect(lookAtXML).to.match(/<parm .*by='val'.*>/);
            expect(lookAtXML).to.match(/<parm .*io='both'.*>/);
        });
    });
});
