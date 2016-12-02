
def extractCallData():


    try:
        a0 = open('aext0.txt')
        user_info = a0.readlines()[1:]
        print len(user_info)
        lu_id, username, last4, dob, address, zip_code, phone_number = user_info[0].split('\t')
        print lu_id
        print phone_number

    except IOError as err:
        print "aext0 doesn't exist: {0}".format(err)

    except IndexError as err:
        print "aext0 is empty: {0}".format(err)

    try:
        a1 = open('aext1.txt')

    except IOError as err:
        print err

    try:
        a2 = open('aext2.txt')
        notes = a2.readlines()[1:]
        for note in notes:
            print note.split('\t')[1]

    except IOError as err:
        print "aext2 doesn't exist: {0}".format(err)

    except IndexError as err:
        print "aext2 is empty: {0}".format(err)

    try:
        a3 = open('aext3.txt')
        flags = a3.readlines()[1:]
        fraudAlert, legalAction, asistDisabled = flags[0].split('\t')
        print 'Fraud Alert: {0} \nLegal Action: {1} \nAssist Disabled: {2}'.format(fraudAlert, legalAction, asistDisabled)

    except IOError as err:
        print "aext3 doesn't exist: {0}".format(err)

    except IndexError as err:
        print "aext3 is empty: {0}".format(err)
