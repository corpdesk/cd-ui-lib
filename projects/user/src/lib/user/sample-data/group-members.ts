export const DATA1 = [
    {
      data: { member_name: 'System Admins', group_member_id: 40, member_guid: '5D865522-6', group_guid_parent: 'AAAAAAAAA-1', cd_obj_type_id: 17, kind: 'dir' },
      children: [
        { data: { member_name: 'GRP_01_L0', group_member_id: 130, member_guid: 'A4F4FE26-B', group_guid_parent: '5D865522-6', cd_obj_type_id: 10, kind: 'dir' } },
        { data: { member_name: 'can_create_group', group_member_id: 222, member_guid: '79F88510-E', group_guid_parent: '5D865522-6', cd_obj_type_id: 10, kind: 'dir' } },
        { data: { member_name: 'ddd', group_member_id: 255, member_guid: '93196B43-C', group_guid_parent: '5D865522-6', cd_obj_type_id: 10, kind: 'dir' } },
        { data: { member_name: 'my_group', group_member_id: 256, member_guid: 'F9179B8D-5', group_guid_parent: '5D865522-6', cd_obj_type_id: 10, kind: 'dir' } },
      ],
    },
    {
      data: { member_name: 'Application Managers', group_member_id: 41, member_guid: '9D7144EA-2', group_guid_parent: 'AAAAAAAAA-1', cd_obj_type_id: 17, kind: 'dir' },
      children: [],
    },
    {
      data: { member_name: 'Company Admins', group_member_id: 42, member_guid: '9784234D-4', group_guid_parent: 'AAAAAAAAA-1', cd_obj_type_id: 17, kind: 'dir' },
      children: [
        { data: { member_name: 'Application Managers', group_member_id: 133, member_guid: '9D7144EA-2', group_guid_parent: '9784234D-4', cd_obj_type_id: 10, kind: 'dir' } },
        { data: { member_name: 'Executive Director', group_member_id: 129280, member_guid: '860CCC6C-E01F-73C8-1FA4-3DB6F091DA1B', group_guid_parent: '9784234D-4', cd_obj_type_id: 10, kind: 'dir' } },
        { data: { member_name: 'Chief Accountant', group_member_id: 129281, member_guid: 'A81BFDF6-27A6-86D6-1955-208CF20024D8', group_guid_parent: '9784234D-4', cd_obj_type_id: 10, kind: 'dir' } },
        { data: { member_name: 'Human Resource Manager', group_member_id: 129282, member_guid: 'E01F453B-41C2-506F-9DA0-0A945E77479D', group_guid_parent: '9784234D-4', cd_obj_type_id: 10, kind: 'dir' } },
      ],
    },
    {
      data: { member_name: 'Private', group_member_id: 43, member_guid: '645730F0-3', group_guid_parent: 'AAAAAAAAA-1', cd_obj_type_id: 17, kind: 'dir' },
      children: [
        { data: { member_name: 'GRP_01_L0', group_member_id: 240, member_guid: 'A4F4FE26-B', group_guid_parent: '9784234D-4', cd_obj_type_id: 10, kind: 'dir' } },
      ],
    }
  ];

  export const DATA2 = [
    {
      member_name: 'System Admins', group_member_id: 40, member_guid: '5D865522-6', group_guid_parent: 'AAAAAAAAA-1', cd_obj_type_id: 17, kind: 'dir',
      children: [
        { member_name: 'GRP_01_L0', group_member_id: 130, member_guid: 'A4F4FE26-B', group_guid_parent: '5D865522-6', cd_obj_type_id: 10, kind: 'dir' , children: []},
        { member_name: 'can_create_group', group_member_id: 222, member_guid: '79F88510-E', group_guid_parent: '5D865522-6', cd_obj_type_id: 10, kind: 'dir' , children: []},
        { member_name: 'ddd', group_member_id: 255, member_guid: '93196B43-C', group_guid_parent: '5D865522-6', cd_obj_type_id: 10, kind: 'dir' , children: []},
        { member_name: 'my_group', group_member_id: 256, member_guid: 'F9179B8D-5', group_guid_parent: '5D865522-6', cd_obj_type_id: 10, kind: 'dir' , children: []},
      ],
    },
    {
      member_name: 'Application Managers', group_member_id: 41, member_guid: '9D7144EA-2', group_guid_parent: 'AAAAAAAAA-1', cd_obj_type_id: 17, kind: 'dir',
      children: [],
    },
    {
      member_name: 'Company Admins', group_member_id: 42, member_guid: '9784234D-4', group_guid_parent: 'AAAAAAAAA-1', cd_obj_type_id: 17, kind: 'dir',
      children: [
        { member_name: 'Application Managers', group_member_id: 133, member_guid: '9D7144EA-2', group_guid_parent: '9784234D-4', cd_obj_type_id: 10, kind: 'dir' , children: []},
        { member_name: 'Executive Director', group_member_id: 129280, member_guid: '860CCC6C-E01F-73C8-1FA4-3DB6F091DA1B', group_guid_parent: '9784234D-4', cd_obj_type_id: 10, kind: 'dir' , children: []},
        { member_name: 'Chief Accountant', group_member_id: 129281, member_guid: 'A81BFDF6-27A6-86D6-1955-208CF20024D8', group_guid_parent: '9784234D-4', cd_obj_type_id: 10, kind: 'dir' , children: []},
        { member_name: 'Human Resource Manager', group_member_id: 129282, member_guid: 'E01F453B-41C2-506F-9DA0-0A945E77479D', group_guid_parent: '9784234D-4', cd_obj_type_id: 10, kind: 'dir' , children: []},
      ],
    },
    {
      member_name: 'Private', group_member_id: 43, member_guid: '645730F0-3', group_guid_parent: 'AAAAAAAAA-1', cd_obj_type_id: 17, kind: 'dir',
      children: [
        { member_name: 'GRP_01_L0', group_member_id: 240, member_guid: 'A4F4FE26-B', group_guid_parent: '9784234D-4', cd_obj_type_id: 10, kind: 'dir' , children: []},
      ],
    }
  ];