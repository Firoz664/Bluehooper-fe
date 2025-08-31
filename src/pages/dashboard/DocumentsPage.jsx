import DashboardHeader from '../../components/ui/DashboardHeader';

const DocumentsPage = () => {
  const documents = [
    {
      id: 1,
      name: 'Building Plans v2.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedBy: 'Sarah Johnson',
      uploadDate: '2024-08-25',
      project: 'Office Complex Build',
    },
    {
      id: 2,
      name: 'Safety Guidelines.docx',
      type: 'DOCX',
      size: '856 KB',
      uploadedBy: 'Mike Davis',
      uploadDate: '2024-08-20',
      project: 'Office Complex Build',
    },
    {
      id: 3,
      name: 'Material Specifications.xlsx',
      type: 'XLSX',
      size: '1.2 MB',
      uploadedBy: 'John Smith',
      uploadDate: '2024-08-18',
      project: 'Residential Development',
    },
    {
      id: 4,
      name: 'Site Photos - Week 12.zip',
      type: 'ZIP',
      size: '15.8 MB',
      uploadedBy: 'Lisa Wilson',
      uploadDate: '2024-08-15',
      project: 'Shopping Center Renovation',
    },
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF':
        return '📄';
      case 'DOCX':
        return '📝';
      case 'XLSX':
        return '📊';
      case 'ZIP':
        return '📦';
      default:
        return '📁';
    }
  };

  return (
    <div>
      <DashboardHeader title="Documents">
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          Upload Document
        </button>
      </DashboardHeader>
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-4">
                {documents.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{getFileIcon(document.type)}</div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{document.name}</h3>
                        <p className="text-sm text-gray-500">
                          {document.size} • Uploaded by {document.uploadedBy} on {document.uploadDate}
                        </p>
                        <p className="text-xs text-gray-400">Project: {document.project}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {document.type}
                      </span>
                      <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded text-sm">
                        Download
                      </button>
                      <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded text-sm">
                        Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;