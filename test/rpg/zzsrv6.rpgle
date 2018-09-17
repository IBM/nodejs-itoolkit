      * CRTRPGMOD MODULE(XMLSERVICE/ZZSRV6) SRCSTMF('/path/to/nodejs-itoolkit/test/rpg/zzsrv6.rpgle')
      * CRTSRVPGM SRVPGM(XMLSERVICE/ZZSRV6) EXPORT(*ALL)
     H NOMAIN
     H AlwNull(*UsrCtl)

      *****************************************************
      * includes
      *****************************************************
     D ARRAYMAX        c                   const(999)

     D dcRec_t         ds                  qualified based(Template)
     D  dcMyName                     10A
     D  dcMyJob                    4096A
     D  dcMyRank                     10i 0
     D  dcMyPay                      12p 2

     D dcRec3_t        ds                  qualified based(Template)
     D  dcMyName3                    10A
     D  dcRec3                             likeds(dcRec_t) dim(ARRAYMAX)

     D dcRec2_t        ds                  qualified based(Template)
     D  dcMyName2                    10A
     D  dcRec2                             likeds(dcRec3_t)

     D dcRec1_t        ds                  qualified based(Template)
     D  dcMyName1                    10A
     D  dcRec1                             likeds(dcRec2_t)
     
     
     D zzarray3        PR
     D  myName                       10A
     D  myMax                         3s 0
     D  wskdist                       3a
     D  wskyear                       4a
     D  wskytyp                       1a
     D  wskschl                       4a
     D  wskusr                       20a
     D  wsksdate                      8a
     D  wskscrse                      8a
     D  wskssect                      4a
     D  wsksmod                       2a
     D  wsoptai                       1a
     D  wsopatdt                      1a
     D  wsoplslot                     2a
     D  myCount                       3s 0
     D  wsoperrtbl                48000a
     D  findMe1                            likeds(dcRec1_t)
     D  findMe2                            likeds(dcRec2_t)
     D  findMe3                            likeds(dcRec3_t)
     

     D zzouch          PR
     D  myName                       10A
     D  myMax                         3s 0
     D  wskdist                       3a
     D  wskyear                       4a
     D  wskytyp                       1a
     D  wskschl                       4a
     D  wskusr                       20a
     D  wsksdate                      8a
     D  wskscrse                      8a
     D  wskssect                      4a
     D  wsksmod                       2a
     D  wsoptai                       1a
     D  wsopatdt                      1a
     D  wsoplslot                     2a
     D  myCount                       3s 0
     D  wsoperrtbl                48000a
     D  findMe1                            likeds(dcRec1_t)
     D  findMe2                            likeds(dcRec2_t)
     D  findMe3                            likeds(dcRec3_t)


     D zzvary4         PR            20A   varying(4)
     D  myName                       10A   varying(4)



     D memset          PR                  ExtProc('__memset')
     D  pTarget                        *   Value
     D  nChar                        10I 0 Value
     D  nBufLen                      10U 0 Value

     d zznullid        pr
     D  fdate1                         D   datfmt(*USA)
     D  fnull1                       10A

     d zznullme        pr              N
     D  fdate1                         D   datfmt(*USA) options(*nullind)

     
     D zzptr1          PR
     D  myPtr1                         *
     D  myPtr2                         *
     D  myMax                         3s 0
     D  wskdist                       3a

     
     D zzbool1         PR
     D  myBool1                       1N
     D  myBool2                       1N
     D  myMax                         3s 0
     D  wskdist                       3a

     D zzold1          PR
     D  Len                           2  0
     D  Wid                           2  0
     D  Area                          4  0
     D  Frog                         10

      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      * zznullid: check indicator 
      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     P zznullid        B                   export
     D zznullid        PI
     D  fdate1                         D   datfmt(*USA)
     D  fnull1                       10A
      * fake nullind
     D dcNULL_t        ds                  qualified based(Template)
     D  dcData                         *
     D  dcNULL                         *
     D tmp             S               n   inz(*ON)
     D ddate1          ds                  likeds(dcNULL_t) 
     D vdate1          s               D   datfmt(*USA)
     D ndate1          s               N   inz(*ON)
      * fake call out
     D procPtr         S               *   ProcPtr
     D pMyProc1        Pr             1N   ExtProc(procPtr)
     D  pargv1                         *   value
      /free
       vdate1 = fdate1;
       ndate1 = *ON;
       ddate1.dcData = %addr(vdate1);
       ddate1.dcNULL = %addr(ndate1);

       procPtr = %paddr(zznullme);
       tmp = pMyProc1(%addr(ddate1));

       fdate1 = vdate1;
       if tmp = *ON;
         fnull1 = 'NULL ON';
       else;
         fnull1 = 'NULL OFF';
       endif;
      /end-free
     P                 E

      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      * zznullme: check indicator 
      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     P zznullme        B                   export
     D zznullme        PI              n
     D  fdate1                         D   datfmt(*USA) options(*nullind)
      /free
       fdate1 = d'2014-01-07';
       %nullind(fdate1) = *OFF;
       return %nullind(fdate1);
      /end-free
     P                 E


      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      * zzvary4: check return varying 
      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     P zzvary4         B                   export
     D zzvary4         PI            20A   varying(4)
     D  myName                       10A   varying(4)
      * vars
     D tmp             S             20A   varying(4)
      /free
       tmp = 'my name is ';
       tmp = tmp + myName;
       return tmp;
      /end-free
     P                 E
     
     

      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      * zzarray3: check parameter array aggregate 
      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     P zzarray3        B                   export
     D zzarray3        PI
     D  myName                       10A
     D  myMax                         3s 0
     D  wskdist                       3a
     D  wskyear                       4a
     D  wskytyp                       1a
     D  wskschl                       4a
     D  wskusr                       20a
     D  wsksdate                      8a
     D  wskscrse                      8a
     D  wskssect                      4a
     D  wsksmod                       2a
     D  wsoptai                       1a
     D  wsopatdt                      1a
     D  wsoplslot                     2a
     D  myCount                       3s 0
     D  wsoperrtbl                48000a
     D  findMe1                            likeds(dcRec1_t)
     D  findMe2                            likeds(dcRec2_t)
     D  findMe3                            likeds(dcRec3_t)
      * vars
     D i               S             10i 0 inz(0)
     D max             S             10i 0 inz(ARRAYMAX)
      /free
       if myMax <= max;
         max = myMax;
       endif;
       wskdist  = '123';
       wskyear  = '1234';
       wskytyp  = 'R';
       wskschl  = '1111';
       wskusr   = myName;
       wsksdate = '20120102';
       wskscrse = 'frog';
       wskssect = '9999';
       wsksmod  = '33';
       wsoptai  = 'A';
       wsopatdt = 'B';
       wsoplslot= '12';
       wsoperrtbl = 'ok in here';
       // findMe3
       findMe3.dcMyName3 = %trim(myName);
       for i = 1 to max;
         findMe3.dcRec3(i).dcMyName = %trim(myName) + %char(i);
         if myMax > 10;
           memset(%ADDR(findMe3.dcRec3(i).dcMyJob):195:4095); // 'C'
         else;
           findMe3.dcRec3(i).dcMyJob  = 'Test 30' + %char(i);
         endif;
         findMe3.dcRec3(i).dcMyRank = 30 + i;
         findMe3.dcRec3(i).dcMyPay  = 13.43 * i;
         myCount = i;
       endfor;
       // findMe2
       findMe2.dcMyName2 = %trim(myName);
       findMe2.dcRec2.dcMyName3 = %trim(myName);
       for i = 1 to max;
         findMe2.dcRec2.dcRec3(i).dcMyName = %trim(myName) + %char(i);
         if myMax > 10;
           memset(%ADDR(findMe2.dcRec2.dcRec3(i).dcMyJob):194:4095); // 'B'
         else;
           findMe2.dcRec2.dcRec3(i).dcMyJob  = 'Test 20' + %char(i);
         endif;
         findMe2.dcRec2.dcRec3(i).dcMyRank = 20 + i;
         findMe2.dcRec2.dcRec3(i).dcMyPay  = 13.42 * i;
         myCount = i;
       endfor;
       // findMe1
       findMe1.dcMyName1 = %trim(myName);
       findMe1.dcRec1.dcMyName2 = %trim(myName);
       findMe1.dcRec1.dcRec2.dcMyName3 = %trim(myName);
       for i = 1 to max;
         findMe1.dcRec1.dcRec2.dcRec3(i).dcMyName = %trim(myName) + %char(i);
         if myMax > 10;
           memset(%ADDR(findMe1.dcRec1.dcRec2.dcRec3(i).dcMyJob):193:4095); // 'A'
         else;
           findMe1.dcRec1.dcRec2.dcRec3(i).dcMyJob  = 'Test 10' + %char(i);
         endif;
         findMe1.dcRec1.dcRec2.dcRec3(i).dcMyRank = 10 + i;
         findMe1.dcRec1.dcRec2.dcRec3(i).dcMyPay  = 13.41 * i;
         myCount = i;
       endfor;
       return;
      /end-free
     P                 E


      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      * zzouch: check BAD parameter array aggregate 
      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     P zzouch          B                   export
     D zzouch          PI
     D  myName                       10A
     D  myMax                         3s 0
     D  wskdist                       3a
     D  wskyear                       4a
     D  wskytyp                       1a
     D  wskschl                       4a
     D  wskusr                       20a
     D  wsksdate                      8a
     D  wskscrse                      8a
     D  wskssect                      4a
     D  wsksmod                       2a
     D  wsoptai                       1a
     D  wsopatdt                      1a
     D  wsoplslot                     2a
     D  myCount                       3s 0
     D  wsoperrtbl                48000a
     D  findMe1                            likeds(dcRec1_t)
     D  findMe2                            likeds(dcRec2_t)
     D  findMe3                            likeds(dcRec3_t)
      * vars
     D i               S             10i 0 inz(0)
     D max             S             10i 0 inz(ARRAYMAX)
      /free
       if myMax <= max;
         max = myMax;
       endif;
       wskdist  = '123';
       wskyear  = '1234';
       wskytyp  = 'R';
       wskschl  = '1111';
       wskusr   = myName;
       wsksdate = '20120102';
       wskscrse = 'frog';
       wskssect = '9999';
       wsksmod  = '33';
       wsoptai  = 'A';
       wsopatdt = 'B';
       wsoplslot= '12';
       wsoperrtbl = 'ok in here';
       // findMe3
       findMe3.dcMyName3 = %trim(myName);
       for i = 1 to max;
         findMe3.dcRec3(i).dcMyName = %trim(myName) + %char(i);
         if myMax > 10;
           memset(%ADDR(findMe3.dcRec3(i).dcMyJob):195:4095); // 'C'
         else;
           findMe3.dcRec3(i).dcMyJob  = 'Test 30' + %char(i);
         endif;
         findMe3.dcRec3(i).dcMyRank = 30 + i;
         findMe3.dcRec3(i).dcMyPay  = 13.43 * i;
         myCount = i;
       endfor;
       // findMe2
       findMe2.dcMyName2 = %trim(myName);
       findMe2.dcRec2.dcMyName3 = %trim(myName);
       // ouch 
       memset(%addr(findMe2.dcRec2.dcRec3(2).dcMyName):196:32768); // 'D'
       return;
      /end-free
     P                 E

      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      * zzptr1: check skip ptr 
      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     P zzptr1          B                   export
     D zzptr1          PI
     D  myPtr1                         *
     D  myPtr2                         *
     D  myMax                         3s 0
     D  wskdist                       3a
      * vars
     D i               S             10i 0 inz(0)
     D max             S             10i 0 inz(ARRAYMAX)
      /free
       if myMax <= max;
         max = myMax;
       endif;
       wskdist  = '123';
       myPtr1 = %addr(myMax);
       myPtr2 = %addr(wskdist);
       return;
      /end-free
     P                 E

      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      * zzbool1: check boolean 
      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     P zzbool1         B                   export
     D zzbool1         PI
     D  myBool1                       1N
     D  myBool2                       1N
     D  myMax                         3s 0
     D  wskdist                       3a
      * vars
     D i               S             10i 0 inz(0)
     D max             S             10i 0 inz(ARRAYMAX)
      /free
       if myMax <= max;
         max = myMax;
       endif;
       wskdist  = '123';
       myBool1 = *ON;
       myBool2 = *OFF;
       return;
      /end-free
     P                 E

      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      * zzold1: default type
      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     P zzold1          B                   export
     D zzold1          PI
     D  Len                           2  0
     D  Wid                           2  0
     D  Area                          4  0
     D  Frog                         10
      * vars
     D i               S             10i 0 inz(0)
     D max             S             10i 0 inz(ARRAYMAX)
      /free
       Len  = 1;
       Wid  = 2;
       Area = 3;
       Frog = 'Green';
       return;
      /end-free
     P                 E

     
