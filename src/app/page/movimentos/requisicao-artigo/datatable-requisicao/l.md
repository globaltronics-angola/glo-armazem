


      [
        {
          text: [
            {
              text: 'Data.: ' + moment().format('DD / MM / YYYY HH:mm'),
              fontSize: 10,
              width: 170,
              bold: false,
              borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],

            },
            {
              text: 'Ref.: ' + move.oItem.docRef,
              fontSize: 9,
              width: 170,
              bold: false,
              borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],

            },
            {
              text: 'Requisitante.: ' + this.auth.user.displayName,
              fontSize: 8,
              width: 170,
              bold: false,
              borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],
            }

          ],
          border: [false, false, false, false],
        },
        '',
        [
          {
            text: ('Cliente : ').toUpperCase(),
            fontSize: 10,
            bold: false,
            colSpan: 3,
            borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
            margin: [0, 0, 0, 3],
          },
          {
            text: client.name,
            fontSize: 10,
            colSpan: 3,
            borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
            bold: false,
            margin: [0, 0, 0, 3]
          },
          {
            text: client.identityClient ? 'Contribuinte nº 5417106372 ' + client.identityClient : '',
            fontSize: 7,
            bold: false,
            colSpan: 3,
            borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
            color: '#515A5A',
            margin: [0, 0, 0, 2],
          },
          {
            text: 'Luanda - Angola',
            fontSize: 9,
            bold: false,
            colSpan: 3,
            borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
            color: '#515A5A',
            margin: [0, 0, 0, 2],
          }

        ]
      ]


    [
        {
        text: 'Data.: ' + moment().format('DD / MM / YYYY HH:mm'),
        fontSize: 10,
        bold: false,
        borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],

      },
        {
        text: '',
        colSpan: 3,
        borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
      },
        {
          text: ('Cliente : ').toUpperCase(),
          fontSize: 10,
          bold: false,
          borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
        }
      ]
