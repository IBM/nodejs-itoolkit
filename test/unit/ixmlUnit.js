// Copyright (c) International Business Machines Corp. 2019
// All Rights Reserved

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
// associated documentation files (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or
// substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
// NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/* eslint-env mocha */
// eslint-disable-next-line import/no-extraneous-dependencies
const { expect } = require('chai');
const xml = require('../../lib/ixml');

describe('ixml Unit Tests', () => {
  describe('iXmlNodeError', () => {
    it('returns an error element with message passed to it as the value', () => {
      const message = 'This is a dummy error message';
      const result = xml.iXmlNodeError(message);
      expect(result).to.equal(`<error>${message}</error>`);
    });
  });

  describe('iXmlNodeHead', () => {
    it('returns the xml declaration', () => {
      expect(xml.iXmlNodeHead()).to.equal('<?xml version=\'1.0\'?>');
    });
  });

  describe('iXmlNodeScriptOpen', () => {
    it('returns the XMLSERVICE script open tag', () => {
      expect(xml.iXmlNodeScriptOpen()).to.equal('<myscript>');
    });
  });

  describe('iXmlNodeScriptClose', () => {
    it('returns the XMLSERVICE script close tag', () => {
      expect(xml.iXmlNodeScriptClose()).to.equal('</myscript>');
    });
  });

  describe('iXmlNodePgmOpen', () => {
    it('returns the XMLSERVICE pgm open tag with default attributes', () => {
      expect(xml.iXmlNodePgmOpen()).to.equal('<pgm name=\'undefined\' error=\'fast\'>');
    });
    it('returns the XMLSERVICE pgm open tag with name mypgrogram', () => {
      expect(xml.iXmlNodePgmOpen('myprogram')).to.equal('<pgm name=\'myprogram\' error=\'fast\'>');
    });
    it('returns the XMLSERVICE pgm open tag with lib mylibrary', () => {
      expect(xml.iXmlNodePgmOpen('', 'mylibrary')).to.equal('<pgm name=\'undefined\' lib=\'mylibrary\' error=\'fast\'>');
    });
    it('returns the XMLSERVICE pgm open tag with function myfunction', () => {
      expect(xml.iXmlNodePgmOpen('', '', 'myfunction')).to.equal('<pgm name=\'undefined\' func=\'myfunction\' error=\'fast\'>');
    });
    it('returns the XMLSERVICE pgm open tag with error on', () => {
      expect(xml.iXmlNodePgmOpen('', '', '', 'on')).to.equal('<pgm name=\'undefined\' error=\'on\'>');
    });
  });

  describe('iXmlNodePgmClose', () => {
    it('returns the XMLSERVICE pgm close tag', () => {
      expect(xml.iXmlNodePgmClose()).to.equal('</pgm>');
    });
  });

  describe('iXmlNodeParmOpen', () => {
    it('returns the XMLSERVICE parm open tag w/o any attributes', () => {
      expect(xml.iXmlNodeParmOpen()).to.equal('<parm>');
    });
    it('returns the XMLSERVICE parm open tag with by attributes', () => {
      const result = xml.iXmlNodeParmOpen({ by: 'value' });

      expect(result).to.equal('<parm by=\'value\'>');
    });
    it('returns the XMLSERVICE parm open tag with io attributes', () => {
      const result = xml.iXmlNodeParmOpen({ io: 'both' });

      expect(result).to.equal('<parm io=\'both\'>');
    });
  });

  describe('iXmlNodeParmClose', () => {
    it('returns the XMLSERVICE parm close tag', () => {
      expect(xml.iXmlNodeParmClose()).to.equal('</parm>');
    });
  });

  describe('iXmlNodeReturnOpen', () => {
    it('returns the XMLSERVICE return open tag', () => {
      expect(xml.iXmlNodeReturnOpen()).to.equal('<return>');
    });
  });

  describe('iXmlNodeReturnClose', () => {
    it('returns the XMLSERVICE return close tag', () => {
      expect(xml.iXmlNodeReturnClose()).to.equal('</return>');
    });
  });


  describe('iXmlNodeOverlayOpen', () => {
    it('returns the XMLSERVICE overlay open tag with default attribute io=both ', () => {
      expect(xml.iXmlNodeOverlayOpen()).to.equal('<overlay io=\'both\'>');
    });
    it('returns the XMLSERVICE overlay open tag with attribute io=in', () => {
      expect(xml.iXmlNodeOverlayOpen('in')).to.equal('<overlay io=\'in\'>');
    });
    it('returns the XMLSERVICE overlay open tag with attribute offset', () => {
      expect(xml.iXmlNodeOverlayOpen('', 2)).to.equal('<overlay io=\'both\' offset=\'2\'>');
    });
    it('returns the XMLSERVICE overlay open tag with attribute top', () => {
      expect(xml.iXmlNodeOverlayOpen('', '', 'on')).to.equal('<overlay io=\'both\' top=\'on\'>');
    });
  });

  describe('iXmlNodeOverlayClose', () => {
    it('returns the XMLSERVICE overlay close tag', () => {
      expect(xml.iXmlNodeOverlayClose()).to.equal('</overlay>');
    });
  });

  describe('iXmlNodeDsOpen', () => {
    it('returns the XMLSERVICE ds open tag w/o attributes', () => {
      expect(xml.iXmlNodeDsOpen()).to.equal('<ds>');
    });
    it('returns the XMLSERVICE ds open tag with dim attribute', () => {
      expect(xml.iXmlNodeDsOpen('3')).to.equal('<ds dim=\'3\'>');
    });
    it('returns the XMLSERVICE ds open tag with dou attribute', () => {
      expect(xml.iXmlNodeDsOpen('', 'label2')).to.equal('<ds dou=\'label2\'>');
    });
    it('returns the XMLSERVICE ds open tag with len attribute', () => {
      expect(xml.iXmlNodeDsOpen('', '', 'label2')).to.equal('<ds len=\'label2\'>');
    });
    it('returns the XMLSERVICE ds open tag with data attribute', () => {
      expect(xml.iXmlNodeDsOpen('', '', '', 'records')).to.equal('<ds data=\'records\'>');
    });
  });

  describe('iXmlNodeDsClose', () => {
    it('returns the XMLSERVICE ds close tag', () => {
      expect(xml.iXmlNodeDsClose()).to.equal('</ds>');
    });
  });

  describe('iXmlNodeDataOpen', () => {
    it('returns the XMLSERVICE data open tag with default attributes', () => {
      expect(xml.iXmlNodeDataOpen()).to.equal('<data type=\'1024a\'>');
    });
    it('returns the XMLSERVICE data open tag with type 1a', () => {
      expect(xml.iXmlNodeDataOpen('1a')).to.equal('<data type=\'1a\'>');
    });
    it('returns the XMLSERVICE data open tag with dim 2', () => {
      expect(xml.iXmlNodeDataOpen('', { dim: '2' })).to.equal('<data type=\'1024a\' dim=\'2\'>');
    });
    it('returns the XMLSERVICE data open tag with varying on', () => {
      expect(xml.iXmlNodeDataOpen('', { varying: 'on' })).to.equal('<data type=\'1024a\' varying=\'on\'>');
    });
    it('returns the XMLSERVICE data open tag with enddo on', () => {
      expect(xml.iXmlNodeDataOpen('', { enddo: 'label' })).to.equal('<data type=\'1024a\' enddo=\'label\'>');
    });
    it('returns the XMLSERVICE data open tag with setlen label', () => {
      expect(xml.iXmlNodeDataOpen('', { setlen: 'label' })).to.equal('<data type=\'1024a\' setlen=\'label\'>');
    });
    it('returns the XMLSERVICE data open tag with offset label', () => {
      expect(xml.iXmlNodeDataOpen('', { offset: 'label' })).to.equal('<data type=\'1024a\' offset=\'label\'>');
    });
    it('returns the XMLSERVICE data open tag with hex on', () => {
      expect(xml.iXmlNodeDataOpen('', { hex: 'on' })).to.equal('<data type=\'1024a\' hex=\'on\'>');
    });
    it('returns the XMLSERVICE data open tag with trim on', () => {
      expect(xml.iXmlNodeDataOpen('', { trim: 'on' })).to.equal('<data type=\'1024a\' trim=\'on\'>');
    });
    it('returns the XMLSERVICE data open tag with next on', () => {
      expect(xml.iXmlNodeDataOpen('', { next: 'on' })).to.equal('<data type=\'1024a\' next=\'on\'>');
    });
  });
  describe('iXmlNodeDataClose', () => {
    it('returns the XMLSERVICE data close tag', () => {
      expect(xml.iXmlNodeDataClose()).to.equal('</data>');
    });
  });
  describe('iXmlNodeCmdOpen', () => {
    it('returns the XMLSERVICE cmd open tag with default attributes', () => {
      expect(xml.iXmlNodeCmdOpen()).to.equal('<cmd exec=\'system\' error=\'fast\'>');
    });
    it('returns the XMLSERVICE cmd open tag with exec rexx ', () => {
      expect(xml.iXmlNodeCmdOpen('rexx')).to.equal('<cmd exec=\'rexx\' error=\'fast\'>');
    });
    it('returns the XMLSERVICE cmd open tag with hex on ', () => {
      expect(xml.iXmlNodeCmdOpen('', 'on')).to.equal('<cmd exec=\'system\' hex=\'on\' error=\'fast\'>');
    });
    it('returns the XMLSERVICE cmd open tag with before 37 ', () => {
      expect(xml.iXmlNodeCmdOpen('', '', '37')).to.equal('<cmd exec=\'system\' before=\'37\' error=\'fast\'>');
    });
    it('returns the XMLSERVICE cmd open tag with after 37 ', () => {
      expect(xml.iXmlNodeCmdOpen('', '', '', '37')).to.equal('<cmd exec=\'system\' after=\'37\' error=\'fast\'>');
    });
    it('returns the XMLSERVICE cmd open tag with error on ', () => {
      expect(xml.iXmlNodeCmdOpen('', '', '', '', 'on')).to.equal('<cmd exec=\'system\' error=\'on\'>');
    });
  });
  describe('iXmlNodeCmdClose', () => {
    it('returns the XMLSERVICE cmd close tag', () => {
      expect(xml.iXmlNodeCmdClose()).to.equal('</cmd>');
    });
  });
  describe('iXmlNodeShOpen', () => {
    it('returns the XMLSERVICE sh open tag with default attributes', () => {
      expect(xml.iXmlNodeShOpen()).to.equal('<sh error=\'fast\'>');
    });
    it('returns the XMLSERVICE sh open tag with rows on ', () => {
      expect(xml.iXmlNodeShOpen('on')).to.equal('<sh rows=\'on\' error=\'fast\'>');
    });
    it('returns the XMLSERVICE sh open tag with hex on ', () => {
      expect(xml.iXmlNodeShOpen('', 'on')).to.equal('<sh hex=\'on\' error=\'fast\'>');
    });
    it('returns the XMLSERVICE sh open tag with before 37 ', () => {
      expect(xml.iXmlNodeShOpen('', '', '37')).to.equal('<sh before=\'37\' error=\'fast\'>');
    });
    it('returns the XMLSERVICE sh open tag with after 37 ', () => {
      expect(xml.iXmlNodeShOpen('', '', '', '37')).to.equal('<sh after=\'37\' error=\'fast\'>');
    });
    it('returns the XMLSERVICE sh open tag with error on ', () => {
      expect(xml.iXmlNodeShOpen('', '', '', '', 'on')).to.equal('<sh error=\'on\'>');
    });
  });
  describe('iXmlNodeShClose', () => {
    it('returns the XMLSERVICE sh close tag', () => {
      expect(xml.iXmlNodeShClose()).to.equal('</sh>');
    });
  });
  describe('iXmlNodeQshOpen', () => {
    it('returns the XMLSERVICE qsh open tag with default attributes', () => {
      expect(xml.iXmlNodeQshOpen()).to.equal('<qsh error=\'fast\'>');
    });
    it('returns the XMLSERVICE qsh open tag with rows on ', () => {
      expect(xml.iXmlNodeQshOpen('on')).to.equal('<qsh rows=\'on\' error=\'fast\'>');
    });
    it('returns the XMLSERVICE qsh open tag with hex on ', () => {
      expect(xml.iXmlNodeQshOpen('', 'on')).to.equal('<qsh hex=\'on\' error=\'fast\'>');
    });
    it('returns the XMLSERVICE qsh open tag with before 37 ', () => {
      expect(xml.iXmlNodeQshOpen('', '', '37')).to.equal('<qsh before=\'37\' error=\'fast\'>');
    });
    it('returns the XMLSERVICE qsh open tag with after 37 ', () => {
      expect(xml.iXmlNodeQshOpen('', '', '', '37')).to.equal('<qsh after=\'37\' error=\'fast\'>');
    });
    it('returns the XMLSERVICE qsh open tag with error on ', () => {
      expect(xml.iXmlNodeQshOpen('', '', '', '', 'on')).to.equal('<qsh error=\'on\'>');
    });
  });
  describe('iXmlNodeQshClose', () => {
    it('returns the XMLSERVICE qsh close tag', () => {
      expect(xml.iXmlNodeQshClose()).to.equal('</qsh>');
    });
  });
  describe('iXmlNodeSqlOpen', () => {
    it('returns the XMLSERVICE qsh open tag with default attributes', () => {
      expect(xml.iXmlNodeSqlOpen()).to.equal('<sql>');
    });
  });
  describe('iXmlNodeSqlClose', () => {
    it('returns the XMLSERVICE sql close tag', () => {
      expect(xml.iXmlNodeSqlClose()).to.equal('</sql>');
    });
  });
  describe.skip('iXmlNodeSqlConnect', () => {
    it('returns the XMLSERVICE qsh open tag with default attributes', () => {
    });
  });
  describe.skip('iXmlNodeSqlOptions', () => {
    it('', () => {
    });
  });
  describe('iXmlNodeSqlQueryOpen', () => {
    it('returns the XMLSERVICE query open tag with default attributes', () => {
      expect(xml.iXmlNodeSqlQueryOpen()).to.equal('<query error=\'fast\'>');
    });
    it('returns the XMLSERVICE query open tag with error is on', () => {
      expect(xml.iXmlNodeSqlQueryOpen('on')).to.equal('<query error=\'on\'>');
    });
  });
  describe('iXmlNodeSqlQueryClose', () => {
    it('returns the XMLSERVICE query close tag', () => {
      expect(xml.iXmlNodeSqlQueryClose()).to.equal('</query>');
    });
  });
  describe('iXmlNodeSqlPrepareOpen', () => {
    it('returns the XMLSERVICE prepare open tag with default attributes', () => {
      expect(xml.iXmlNodeSqlPrepareOpen()).to.equal('<prepare error=\'fast\'>');
    });
    it('returns the XMLSERVICE prepare open tag with error is on', () => {
      expect(xml.iXmlNodeSqlPrepareOpen('on')).to.equal('<prepare error=\'on\'>');
    });
  });
  describe('iXmlNodeSqlPrepareClose', () => {
    it('returns the XMLSERVICE prepare close tag', () => {
      expect(xml.iXmlNodeSqlPrepareClose()).to.equal('</prepare>');
    });
  });
  describe('iXmlNodeSqlExecuteOpen', () => {
    it('returns the XMLSERVICE execute open tag with default attributes', () => {
      expect(xml.iXmlNodeSqlExecuteOpen()).to.equal('<execute error=\'fast\'>');
    });
    it('returns the XMLSERVICE execute open tag with error is on', () => {
      expect(xml.iXmlNodeSqlExecuteOpen('on')).to.equal('<execute error=\'on\'>');
    });
  });
  describe('iXmlNodeSqlExecuteClose', () => {
    it('returns the XMLSERVICE execute close tag', () => {
      expect(xml.iXmlNodeSqlExecuteClose()).to.equal('</execute>');
    });
  });
  describe('iXmlNodeSqlParmOpen', () => {
    it('returns the XMLSERVICE param open tag with default attributes', () => {
      expect(xml.iXmlNodeSqlParmOpen()).to.equal('<parm>');
    });
    it('returns the XMLSERVICE param open tag with io is both', () => {
      expect(xml.iXmlNodeSqlParmOpen('both')).to.equal('<parm io=\'both\'>');
    });
  });
  describe('iXmlNodeSqlParmClose', () => {
    it('returns the XMLSERVICE parm close tag', () => {
      expect(xml.iXmlNodeSqlParmClose()).to.equal('</parm>');
    });
  });
  describe('iXmlNodeSqlFetch', () => {
    it('returns the XMLSERVICE fetch tag with default attributes', () => {
      expect(xml.iXmlNodeSqlFetch()).to.equal('<fetch block=\'all\' desc=\'on\'></fetch>');
    });
    it('returns the XMLSERVICE fetch tag with error is on', () => {
      expect(xml.iXmlNodeSqlFetch('', '', 'on')).to.equal('<fetch block=\'all\' desc=\'on\' error=\'on\'></fetch>');
    });
    it('returns the XMLSERVICE fetch tag with block is 10', () => {
      expect(xml.iXmlNodeSqlFetch('10', '', '')).to.equal('<fetch block=\'10\' desc=\'on\'></fetch>');
    });
    it('returns the XMLSERVICE fetch tag with desc is off', () => {
      expect(xml.iXmlNodeSqlFetch('', 'off', '')).to.equal('<fetch block=\'all\' desc=\'off\'></fetch>');
    });
  });
  describe('iXmlNodeSqlCommit', () => {
    it('returns the XMLSERVICE commit tag with default attributes', () => {
      expect(xml.iXmlNodeSqlCommit()).to.equal('<commit action=\'rollback\'></commit>');
    });
    it('returns the XMLSERVICE commit tag with action is commit', () => {
      expect(xml.iXmlNodeSqlCommit('commit')).to.equal('<commit action=\'commit\'></commit>');
    });
    it('returns the XMLSERVICE commit tag with error is on', () => {
      expect(xml.iXmlNodeSqlCommit('', 'on')).to.equal('<commit action=\'rollback\' error=\'on\'></commit>');
    });
  });
  describe('iXmlNodeSqlRowCount', () => {
    it('returns the XMLSERVICE rowcount tag with default attributes', () => {
      expect(xml.iXmlNodeSqlRowCount()).to.equal('<rowcount></rowcount>');
    });
    it('returns the XMLSERVICE rowcount tag with error is on', () => {
      expect(xml.iXmlNodeSqlRowCount('on')).to.equal('<rowcount error=\'on\'></rowcount>');
    });
  });
  describe('iXmlNodeSqlCount', () => {
    it('returns the XMLSERVICE count tag with default attributes', () => {
      expect(xml.iXmlNodeSqlCount()).to.equal('<count desc=\'both\'></count>');
    });
    it('returns the XMLSERVICE count tag with desc is parm', () => {
      expect(xml.iXmlNodeSqlCount('parm')).to.equal('<count desc=\'parm\'></count>');
    });
    it('returns the XMLSERVICE count tag with error is on', () => {
      expect(xml.iXmlNodeSqlCount('', 'on')).to.equal('<count desc=\'both\' error=\'on\'></count>');
    });
  });
  describe('iXmlNodeSqlDescribe', () => {
    it('returns the XMLSERVICE describe tag with default attributes', () => {
      expect(xml.iXmlNodeSqlDescribe()).to.equal('<describe desc=\'both\'></describe>');
    });
    it('returns the XMLSERVICE describe tag with desc is parm', () => {
      expect(xml.iXmlNodeSqlDescribe('parm')).to.equal('<describe desc=\'parm\'></describe>');
    });
    it('returns the XMLSERVICE describe tag with error is on', () => {
      expect(xml.iXmlNodeSqlDescribe('', 'on')).to.equal('<describe desc=\'both\' error=\'on\'></describe>');
    });
  });
  describe('iXmlNodeSqlTablesOpen', () => {
    it('returns the XMLSERVICE tables open tag with default attributes', () => {
      expect(xml.iXmlNodeSqlTablesOpen()).to.equal('<tables>');
    });
    it('returns the XMLSERVICE tables open tag with error is on ', () => {
      expect(xml.iXmlNodeSqlTablesOpen('on')).to.equal('<tables error=\'on\'>');
    });
  });
  describe('iXmlNodeSqlTablesClose', () => {
    it('returns the XMLSERVICE tables close tag', () => {
      expect(xml.iXmlNodeSqlTablesClose()).to.equal('</tables>');
    });
  });
  describe('iXmlNodeSqlTableprivOpen', () => {
    it('returns the XMLSERVICE tablepriv open tag with default attributes', () => {
      expect(xml.iXmlNodeSqlTableprivOpen()).to.equal('<tablepriv>');
    });
    it('returns the XMLSERVICE tablepriv open tag with error is on', () => {
      expect(xml.iXmlNodeSqlTableprivOpen('on')).to.equal('<tablepriv error=\'on\'>');
    });
  });
  describe('iXmlNodeSqlTableprivClose', () => {
    it('returns the XMLSERVICE tablepriv close tag', () => {
      expect(xml.iXmlNodeSqlTableprivClose()).to.equal('</tablepriv>');
    });
  });
  describe('iXmlNodeSqlColumnsOpen', () => {
    it('returns the XMLSERVICE columns open tag with default attributes', () => {
      expect(xml.iXmlNodeSqlColumnsOpen()).to.equal('<columns>');
    });
    it('returns the XMLSERVICE columns open tag with error is on', () => {
      expect(xml.iXmlNodeSqlColumnsOpen('on')).to.equal('<columns error=\'on\'>');
    });
  });
  describe('iXmlNodeSqlColumnsClose', () => {
    it('returns the XMLSERVICE columns close tag', () => {
      expect(xml.iXmlNodeSqlColumnsClose()).to.equal('</columns>');
    });
  });
  describe('iXmlNodeSqlSpecialOpen', () => {
    it('returns the XMLSERVICE special open tag with default attributes', () => {
      expect(xml.iXmlNodeSqlSpecialOpen()).to.equal('<special>');
    });
    it('returns the XMLSERVICE special open tag with error is on', () => {
      expect(xml.iXmlNodeSqlSpecialOpen('on')).to.equal('<special error=\'on\'>');
    });
  });
  describe('iXmlNodeSqlSpecialClose', () => {
    it('returns the XMLSERVICE special close tag', () => {
      expect(xml.iXmlNodeSqlSpecialClose()).to.equal('</special>');
    });
  });
  describe('iXmlNodeSqlColumnprivOpen', () => {
    it('returns the XMLSERVICE columnpriv open tag with default attributes', () => {
      expect(xml.iXmlNodeSqlColumnprivOpen()).to.equal('<columnpriv>');
    });
    it('returns the XMLSERVICE columnpriv open tag with error is on', () => {
      expect(xml.iXmlNodeSqlColumnprivOpen('on')).to.equal('<columnpriv error=\'on\'>');
    });
  });
  describe('iXmlNodeSqlColumnprivClose', () => {
    it('returns the XMLSERVICE columnpriv close tag', () => {
      expect(xml.iXmlNodeSqlColumnprivClose()).to.equal('</columnpriv>');
    });
  });
  describe('iXmlNodeSqlProceduresOpen', () => {
    it('returns the XMLSERVICE procedures open tag with default attributes', () => {
      expect(xml.iXmlNodeSqlProceduresOpen()).to.equal('<procedures>');
    });
    it('returns the XMLSERVICE procedures open tag with error is on', () => {
      expect(xml.iXmlNodeSqlProceduresOpen('on')).to.equal('<procedures error=\'on\'>');
    });
  });
  describe('iXmlNodeSqlProceduresClose', () => {
    it('returns the XMLSERVICE procedures close tag', () => {
      expect(xml.iXmlNodeSqlProceduresClose()).to.equal('</procedures>');
    });
  });
  describe('iXmlNodeSqlPcolumnsOpen', () => {
    it('returns the XMLSERVICE pcolumns open tag with default attributes', () => {
      expect(xml.iXmlNodeSqlPcolumnsOpen()).to.equal('<pcolumns>');
    });
    it('returns the XMLSERVICE pcolumns open tag with error is on', () => {
      expect(xml.iXmlNodeSqlPcolumnsOpen('on')).to.equal('<pcolumns error=\'on\'>');
    });
  });
  describe('iXmlNodeSqlPcolumnsClose', () => {
    it('returns the XMLSERVICE pcolumns close tag', () => {
      expect(xml.iXmlNodeSqlPcolumnsClose()).to.equal('</pcolumns>');
    });
  });
  describe('iXmlNodeSqlPrimarykeysOpen', () => {
    it('returns the XMLSERVICE primarykeys open tag with default attributes', () => {
      expect(xml.iXmlNodeSqlPrimarykeysOpen()).to.equal('<primarykeys>');
    });
    it('returns the XMLSERVICE primarykeys open tag with error is on', () => {
      expect(xml.iXmlNodeSqlPrimarykeysOpen('on')).to.equal('<primarykeys error=\'on\'>');
    });
  });
  describe('iXmlNodeSqlPrimarykeysClose', () => {
    it('returns the XMLSERVICE primarykeys close tag', () => {
      expect(xml.iXmlNodeSqlPrimarykeysClose()).to.equal('</primarykeys>');
    });
  });
  describe('iXmlNodeSqlForeignkeysOpen', () => {
    it('returns the XMLSERVICE foreignkeys open tag with default attributes', () => {
      expect(xml.iXmlNodeSqlForeignkeysOpen()).to.equal('<foreignkeys>');
    });
    it('returns the XMLSERVICE foreignkeys open tag with error is on', () => {
      expect(xml.iXmlNodeSqlForeignkeysOpen('on')).to.equal('<foreignkeys error=\'on\'>');
    });
  });
  describe('iXmlNodeSqlForeignkeysClose', () => {
    it('returns the XMLSERVICE foreignkeys close tag', () => {
      expect(xml.iXmlNodeSqlForeignkeysClose()).to.equal('</foreignkeys>');
    });
  });
  describe('iXmlNodeSqlStatisticsOpen', () => {
    it('returns the XMLSERVICE statistics open tag with default attributes', () => {
      expect(xml.iXmlNodeSqlStatisticsOpen()).to.equal('<statistics>');
    });
    it('returns the XMLSERVICE statistics open tag with error is on', () => {
      expect(xml.iXmlNodeSqlStatisticsOpen('on')).to.equal('<statistics error=\'on\'>');
    });
  });
  describe('iXmlNodeSqlStatisticsClose', () => {
    it('returns the XMLSERVICE statistics close tag', () => {
      expect(xml.iXmlNodeSqlStatisticsClose()).to.equal('</statistics>');
    });
  });
  describe('iXmlNodeSqlFree', () => {
    it('returns the XMLSERVICE free tag with default attributes', () => {
      expect(xml.iXmlNodeSqlFree()).to.equal('<free></free>');
    });
  });
});
